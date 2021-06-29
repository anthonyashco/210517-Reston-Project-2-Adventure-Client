from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app: Flask = Flask(__name__, template_folder="html", static_folder="")
CORS(app)


@app.route("/", methods=["GET"])
def welcome():
    print(request.data.decode())
    return render_template("login.html")


@app.route("/login", methods=["POST"])
def login():
    print(request.data.decode())
    return jsonify(1)


@app.route("/claim", methods=["GET"])
def get_claims():
    print(request.data.decode())
    return jsonify([{
        "claim": "Barbecued arm",
        "amount": 500,
        "approved": False,
    }, {
        "claim": "Dented cuirass",
        "amount": 150,
        "approved": True,
    }])


if __name__ == "__main__":
    app.run()
