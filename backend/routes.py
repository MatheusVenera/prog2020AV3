from config import app, db, jsonify, request
from models import Car

@app.route('/', methods=['GET'])
def index():
  return 'Sistema de cadastro de Carros<br>' +\
    '<a href="/index-cars">Veja os carros cadastrados aqui</a>'


@app.route('/index_cars', methods=['GET'])
def index_cars():
  cars = db.session.query(Car).all()

  json_cars = [_.json() for _ in cars]
  response = jsonify(json_cars)
  response.headers.add("Access-Control-Allow-Origin", "*")

  return response


@app.route('/create_car', methods=['POST'])
def create_car():
  response = jsonify({"result": "success", "details": "ok"})

  data = request.get_json()

  try:
    new_car = Car(**data)
    db.session.add(new_car)
    db.session.commit()
  except Exception as e:
    response = jsonify({"result": "error", "details": e})

  response.headers.add("Access-Control-Allow-Origin", "*")

  return response
