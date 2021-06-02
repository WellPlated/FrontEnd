import flask
from flask import request, jsonify
import sqlite3
import hashlib
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash
from cs50 import SQL
import jwt
from datetime import datetime, timedelta
from random import randint
import urllib.parse
import urllib.request

SECRET_KEY="8947357943789907843098489284HFVH94-7FG-GVVG-"
app = flask.Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)

# Save user who is logged in

token = None

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///database.db")

def user_helper(user) -> dict:
    print(user)
    return {
        "id": str(user[0]["id"]),
        "username": str(user[0]["username"]),
        "password": str(user[0]["password"]),
        "email":str(user[0]["email"])
    }

@app.route('/', methods=['GET'])
def home():
    return "Well Plated Backend!"

@app.route('/recipes/all', methods=['GET'])
def api_all_orders():
    recipes = db.execute("SELECT * FROM recipes")
    for recipe in recipes:
        recipe["user"] = db.execute("SELECT username FROM users WHERE id=:id", id=recipe["user_id"])[0]["username"]
        del(recipe["user_id"])
        del(recipe["id"])
    
    return jsonify(recipes)



@app.route('/signup', methods=['POST'])
def api_signup():
    if(request.method=='POST'):
        data = request.json
        
        print(data)

        message = 'success'

        # make sure no fields are blank
        if data['username'] == '':
            message = "No username given. Try again"
        elif data['email'] == '':
            message = "No email given. Try again"
        elif data['password'] == '':
            message = "No password given. Try again"

        if message != 'success':
            print(message)
            return {"status": 403, "message" : message}

        # make sure username is not a duplicate
        duplicate = db.execute("SELECT * FROM users WHERE username = :username", username=data['username'])

        if duplicate != []:
            message = "Username already exists. Pick another one."

        if message != 'success':
            print(message)
            return {"status": 403, "message" : message}

        # hash the password before storing it
        db.execute("INSERT INTO users(username,password,email) VALUES('"+str(data['username'])+"','"+str(generate_password_hash(str(data['password'])).decode('utf8'))+"','"+str(data['email'])+"')")

        # login the user
        auth_user = authenticate_user(data['username'], str(data['password']))
        token = tokenize(auth_user) # generate token
        if type(token) is bytes:
            token=token[2:-1]
 
        return { "status" : 200, "token" : token }

@app.route('/login', methods=['GET', 'POST'])
def api_login():
    if request.method == 'POST':
      data = request.json
      print(request)
      auth_user = authenticate_user(data['username'], str(data['password']))
      if auth_user:
            token = tokenize(auth_user) # generate token
            if type(token) is bytes:
                token=token[2:-1]
            return {"status": 200, "access_token": str(token), "token_type": "bearer"}
      else:
          print("auth:",auth_user)
          return {"status": 403, "message": "Wrong credentials!"}

@app.route('/recipe', methods=["POST"])
def get_recipe():
    if request.method == 'POST':
        data = request.json
        
        recipe = db.execute('SELECT * FROM recipes WHERE hash=:hashnum', hashnum=data["hashnum"])

        return {"status" : 200, "recipe" : recipe}


@app.route('/recipes/user', methods=['POST'])
def user_recipes():
    data=request.json
    print("Printing data")
    print(data)
    try:

        token=data['token']

        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"]) # decode token to extract user metadata
    except:
        return {"status": 403, "message": "Session expired. Log in again!"}

    try:
        response = {}
        response["status"] = 200
        response["recipes"] = db.execute("SELECT * FROM recipes WHERE user_id=:id", id=decoded['user_id'])
        print(response)
        
        return jsonify(response)
    except:
        return {"status": 403, "message": "Unable to get recipes"}
    
@app.route('/upload', methods=['POST'])
def api_upload(): # ENDPOINT to post a recipe
    if(request.method=='POST'):
        
        data = request.json
        token=data['user_id']
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"]) #decode user id from the token provided by the front end
            userID = decoded['user_id']
        except:
            return {"status": 403, "message": "Session expired. Please log in again."}
        
        message = 'success'
        # make sure no fields are blank
        if data['title'] == '':
            message = "No title given. Try again"
        elif data['description'] == '':
            message = "No description given. Try again"
        elif data['ingredients'] == '':
            message = "No ingredients given. Try again"
        elif data['recipe'] == '':
            message = "No steps given. Try again"
        elif data['cuisine'] == 'choose':
            message = "Please choose a cuisine. Try again"

        #check if a recipe already exists
        check = db.execute("SELECT * from recipes WHERE user_id=:user_id and description=:descript and date=:date and title=:title", user_id=userID, descript=data['description'], date=data['date'], title= data['title'])

        if check != []:
            message = "Recipe already exists!"

        if message != 'success': #if the message changed that means something went wrong and we return that
            print(message)
            return {"status": 403, "message" : message}

        uniqueHash = randint(100000, 999999) #create a unique hash for the recipe
        hashCheck = db.execute("SELECT * from recipes where hash=:currHash", currHash=uniqueHash)
        while(hashCheck != []):
            uniqueHash = randint(100000, 999999)
            hashCheck = db.execute("SELECT * from recipes where hash=:currHash", currHash=uniqueHash)

        
        #Post the recipe into the database
        db.execute("INSERT INTO recipes(user_id, title ,date, description, ingredients, recipe, cuisine, hash) \
            VALUES("+str(userID)+", '"+str(data['title'])+"','"+str(data['date'])+"','"+str(data['description'])+"','"+str(data['ingredients'])+"',\
                  '"+str(data['recipe'])+"', '"+str(data['cuisine'])+"', "+str(uniqueHash)+")")
        
        #get back the recipe id that we just put in
        recipeID = db.execute("SELECT id from recipes WHERE user_id=:user_id and description=:descript and date=:date and title=:title", user_id=userID, descript=data['description'], date=data['date'], title= data['title'])
       
        #put tags in for the recipe
        for tag in data['tags']:
            db.execute("INSERT INTO tags(recipe_id,tag) VALUES("+str(recipeID[0]['id'])+","+"'"+str(tag)+"'"+")")

        return {"status": 200 }

@app.route('/recipes/addtag', methods=['POST'])
def api_addtag():
    if request.method == 'POST':
      data = request.json
      db.execute("INSERT INTO tags(recipe_id,tag) VALUES("+str(data['recipe_id'])+","+"'"+str(data['tag'])+"'"+")")
      return {"status": 200, "message": "tag inserted"}


@app.route('/recipes/gettags', methods=['GET'])
def api_gettags():
    if request.method == 'GET':
      data =  request.args
      print(request)
      temp=list(db.execute("SELECT tag FROM tags WHERE recipe_id="+str(data.get("recipe_id"))))
      tags=[]
      for i in range(0,len(temp)):
          tags.append(temp[i]["tag"])
      return_dict={"status":200,"tags":tags}
      return jsonify(return_dict)

@app.route('/getImage', methods=['GET'])
def get_image():
    if request.method == 'GET':
        data = request.args
        link = "https://api.unsplash.com/search/photos?query="+urllib.parse.quote_plus(
            str(data.get("name")))+"&client_id=1pjEpq5A_i7jTAWtXARj4YAehVrEu_VDFAnsOu0PRTs"
        print("link: ", link)
        f = urllib.request.urlopen(link)
        myfile = f.read()
        a = str(myfile).split('"raw":')
        b = a[1].split(",")
        return jsonify({ "url": b[0][1:-1]})

@app.route('/recipes/filter', methods=['POST'])
def api_getfilter():
    if request.method == 'POST':
        data =  request.json
        print("printing data",data)
        tempArray=[]
        if data is None or len(data['tags']) == 0:
            recipes = db.execute("SELECT * FROM recipes")
            for recipe in recipes:
                # find_username = db.execute("SELECT username FROM users WHERE id=:id", id=recipe["user_id"])
                recipe["user"] = db.execute("SELECT username FROM users WHERE id=:id", id=recipe["user_id"])[0]["username"]
                del(recipe["user_id"])
                # recipes.append({"status":200})
            return jsonify(recipes)
        for i in range(0,len(data['tags'])):
            temp=db.execute("SELECT recipe_id FROM tags WHERE lower(tag)='"+str(data['tags'][i]).lower()+"'")
            for j in temp:
                if(j['recipe_id'] not in tempArray):
                    tempArray.append(j['recipe_id'])
        return_list=[]
        for k in range(0,len(tempArray)):
            return_list.append(db.execute("SELECT * FROM recipes WHERE id="+str(tempArray[k])+"")[0])
    # return_list.append({"status",200})
    print(return_list)
    return jsonify(return_list)

@app.route('/delete', methods=['POST'])
def delete_recipe():
    if request.method == 'POST':
        data = request.json
        print(data)
        recipe_id = data['id']

        db.execute("DELETE FROM recipes WHERE id=" + str(recipe_id)) # delete the post
        return {'status' : 'test'}

@app.route('/comment', methods=['POST'])
def comment_on_recipe():
    if request.method == 'POST':
        data = request.json
        comment=data["comment"]
        hashnum = data["hashnum"]
        print(data)
        # insert comment
        db.execute("INSERT INTO comments(comment, recipe_hash) VALUES(:comment, :hashnum)", comment=comment, hashnum=hashnum)
        return {'status' : 'success'}


@app.route('/getcomments', methods=['POST'])
def get_comments():
    if request.method == 'POST':
        data = request.json
        hashnum = data["hashnum"]
        try:
            commentsdict = db.execute("SELECT * FROM comments WHERE recipe_hash=:hashnum", hashnum=hashnum)
            comments = []
            for element in commentsdict: # drop unnecessary columns
                comments.append(element['comment'])
            print(comments)
            return {'status' : '200', 'comments' : comments}
        except:
            return {'status' : '403'}

def tokenize(user_data: dict) -> str: # helper function to generate token
    return jwt.encode(
        {
            'user_id': user_data['id'],
            'email': user_data['email'],
            'password': user_data['password'],
            'exp': datetime.utcnow() + timedelta(minutes=30)
        },
        SECRET_KEY,
        algorithm="HS256")

@app.route('/like', methods=['POST']) 
def like_recipe():
    if request.method == 'POST':
        data = request.json
        recipe_id=data["recipe_id"]
        token=data["token"]
        # decode user id from the token provided by the front end
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id= decoded['user_id']
        print(data)
        db.execute("INSERT INTO liked(user_id, post_id) VALUES(:user_id, :post_id)", user_id=user_id, post_id=recipe_id)
        return {'status' : 'success'}

# @app.route('/unlike', methods=['POST']) 
# def unlike_recipe():
#     if request.method == 'POST':
#         data = request.json
#         recipe_id=data["recipe_id"]
#         token=data["token"]
#         # decode user id from the token provided by the front end
#         decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#         user_id= decoded['user_id']
#         print(data)
#         db.execute("DELETE FROM liked WHERE recipe_id="+str(recipe_id)+" AND WHERE user_id="+str(user_id))
#         return {'status' : 'success'}

@app.route('/getLikes', methods=['POST']) 
def recipe_getLikes():
    if request.method == 'POST':
        data = request.json
        token=data["token"]
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id= decoded['user_id']
        print(data)
        tempData = db.execute("SELECT post_id FROM liked WHERE user_id="+str(user_id))
        recipes_ids=[]
        for i in tempData:
            recipes_ids.append(i['post_id'])
        final_return=[]
        for j in recipes_ids:
            recipes = db.execute("SELECT * FROM recipes WHERE id="+str(j))
            for recipe in recipes:
                # find_username = db.execute("SELECT username FROM users WHERE id=:id", id=recipe["user_id"])
                recipe["user"] = db.execute("SELECT username FROM users WHERE id=:id", id=recipe["user_id"])[0]["username"]
                del(recipe["user_id"])
                final_return.append(recipe)
        print(final_return)
        return jsonify(final_return)

def authenticate_user(username: str, password: str) -> dict: # helper function to check user's credentials
    existing_user = db.execute("SELECT * FROM users WHERE username="+"'"+username+"'")
    print(existing_user)
    # try:
    if existing_user and check_password_hash(existing_user[0]['password'],
                                                password):
        return user_helper(existing_user)
    else:
        return None
    # except:
        # return None

app.run()
