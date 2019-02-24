console.log('Loading function');

// const doc = require('dynamodb-doc');

// const dynamo = new doc.DynamoDB();

var locations = [
  'Zimbabwe',
  'United States',
  'China',
  'Mexico'
];

const zimbabweMaleNames = [
  'Tinashe',
  'Aldrin',
  'Tawanda'
];

const zimbabweFemaleNames = [
  'Romy',
  'Ashley',
  'Tanaka'
];

const usMaleNames = [
  'Michael',
  'David',
  'John'
];

const usFemaleNames = [
  'Mary',
  'Susan',
  'Lisa'
];

const chinaMaleNames = [
  '张伟 Zhang Wei',
  '王伟 Wang Wei',
  '李伟 Li Wei'
];

const chinaFemaleNames = [
  '王芳 Wang Fang',
  '王秀英 Wang Xiu Ying',
  '李秀英 Li Xiu Ying'
];

const mexicoMaleNames = [
  'José Luis',
  'Juan',
  'Miguel Ángel'
];

const mexicoFemaleNames = [
  'María Guadalupe',
  'Juana',
  'Margarita'
];


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getIsFemale(location) {

  var malesIn1000;

  switch (location) {
    case 'Zimbabwe':
      // 166284 male out of 332643 = .500
      malesIn1000 = 500;
      break;
    case 'United States':
      // 2251388 male out of 4390212 = .513
      malesIn1000 = 513;
      break;
    case 'China':
      // 10321766 male out of 19425909 = .531
      malesIn1000 = 531;
      break;
    case 'Mexico':
      // 1023023 male out of 2050119 = .499
      malesIn1000 = 499;
      break;
    default:
      throw new Error('dev error unknown location 2: ' + location);
  }

  // true = female
  return getRandomInt(1000) > malesIn1000;
  // return !!getRandomInt(2) ? 'female' : 'male';

}

function getUndernourished(location) {

  var in10000;

  switch (location) {
    case 'Zimbabwe':
      in10000 = 4644;
      break;
    case 'United States':
    in10000 = 0250;
      break;
    case 'China':
      in10000 = 0903;
      break;
    case 'Mexico':
      in10000 = 0376;
      break;
    default:
      throw new Error('dev error unknown location 3: ' + location);
  }

  return getRandomInt(10000) > in10000;

}

function getHasBasicMath(location, isFemale) {
  // TODO pull math stats
  return getLiterate(location, isFemale);
}

function getLiterate(location, isFemale) {

  var in1000;

  switch (location) {
    case 'Zimbabwe':
       in1000 = isFemale ? 883 : 892;
      break;
    case 'United States':
      in1000 = isFemale ? 990 : 990;
      break;
    case 'China':
      in1000 = isFemale ? 927 : 975;
      break;
    case 'Mexico':
      in1000 = isFemale ? 940 : 958;
      break;
    default:
      throw new Error('dev error unknown location 4: ' + location);
  }

  return getRandomInt(1000) > in1000;

}

function getEducationLevel(location, isFemale) {
  return -1;
}

function getHealth(location) {
  return -1;
}

function createCharacter(location) {

  if (!location || locations.indexOf(location) < 0) {
    throw new Error('location query string parameter is required. Choose one of: ' + locations.toString());
  }

  var character = {
      country: location,
      age: 16
  };

  var isFemale = getIsFemale(location);
  character.gender = isFemale ? 'female' : 'male';
  character.undernourished = getUndernourished(location);
  character.literate = getLiterate(location, isFemale);
  character.hasBasicMath = getHasBasicMath(location, isFemale);
  character.educationLevel = getEducationLevel(location, isFemale);
  character.baseHealth = getHealth(location);
  character.shop = [
    {
      name: 'wrench',
      description: 'todo',
      cost: -1
    },
    {
      name: 'jelly beans',
      description: 'todo',
      cost: -1
    },
    {
      name: 'towel',
      description: 'todo',
      cost: -1
    },
    {
      name: 'todo snack',
      description: 'restores health',
      cost: -1
    }
  ];
  character.inventory = [];

  var names;

  switch (location) {
    case 'Zimbabwe':
      names = isFemale ? zimbabweFemaleNames : zimbabweMaleNames;
      character.usd = 1170;
      // character.highSchoolEnrollment = isFemale ? 0.423 : 0.342;
      // character.undernourishedLikelihood = 0.4644;
      break;
    case 'United States':
      names = isFemale ? usFemaleNames : usMaleNames;
      character.usd = 58270;
      // character.highSchoolEnrollment = isFemale ? 0.891 : 0.851;
      // character.undernourishedLikelihood = 0.0250;
      break;
    case 'China':
      names = isFemale ? chinaFemaleNames : chinaMaleNames;
      character.usd = 8690;
      // This data wasn't included in the measurements - used a number slightly lower than Mexico since they have similar years of school stats.
      // character.highSchoolEnrollment = isFemale ? 0.890 : 0.850;
      // character.undernourishedLikelihood = 0.0903;
      break;
    case 'Mexico':
      names = isFemale ? mexicoFemaleNames : mexicoMaleNames;
      character.usd = 8610;
      // character.highSchoolEnrollment = isFemale ? 0.898 : 0.854;
      // character.undernourishedLikelihood = 0.0376;
      break;
    default:
      throw new Error('dev error unknown location 1: ' + location);
  }

  character.name = names[getRandomInt(names.length)];

  console.log('Created character: ' + JSON.stringify(character));

  return character;

}


/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    });

    try {

      switch (event.httpMethod) {
        // case 'DELETE':
        // dynamo.deleteItem(JSON.parse(event.body), done);
        // break;
        case 'GET':
          // dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
          if (!event.queryStringParameters) {
            throw new Error('location is required. Choose one of: ' + locations.toString());
          }
          done(null, createCharacter(event.queryStringParameters.location));
          break;
        // case 'POST':
        // dynamo.putItem(JSON.parse(event.body), done);
        // break;
        // case 'PUT':
        // dynamo.updateItem(JSON.parse(event.body), done);
        // break;
        default:
        done(new Error(`Unsupported method "${event.httpMethod}"`));
      }
    } catch (ex) {
      done(ex);
    }
};
