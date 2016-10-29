var Schema = {
  user: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 50, nullable: false, unique: true},
    password: {type: 'string', maxlength: 50, nullable: false},
    customerID: {type: 'string', maxlength: 15, nullable: true},
    realName: {type: 'string', maxlength: 20, nullable: true},
    realFamily: {type: 'string', maxlength: 20, nullable: true},
    legalName: {type: 'string', maxlength: 50, nullable: true},
    phone: {type: 'string', maxlength: 15, nullable: false},
    address: {type: 'string', maxlength: 400, nullable: true},
    updated_at: {type: 'dateTime', nullable: true}
  },
  device: {
    id: {type: 'increments', nullable: false, primary: true},
    identifier: {type: 'string', maxlength: 50, nullable: false, unique: true},
    model: {type: 'string', maxlength: 50, nullable: false},
    type: {type: 'string', maxlength: 50, nullable: false, unique: true},
    updated_at: {type: 'dateTime', nullable: true}
  },
  location: {
    id: {type: 'increments', nullable: false, primary: true},
    latitude: {type: 'string', maxlength: 10, nullable: false, nullable: false},
    longitude: {type: 'string', maxlength: 10, nullable: false, nullable: false},
    date: {type: 'dateTime', nullable: false},
    speed: {type: 'integer', nullable: false},
    ew: {type: 'integer', nullable: false},
    ns: {type: 'integer', nullable: false},
  },
  user_device: {
      id: {type: 'increments', nullable: false, primary: true},
      user_id: {type: 'integer', nullable: false, unsigned: true},
      device_id: {type: 'integer', nullable: false, unsigned: true}
  },
  device_location: {
      id: {type: 'increments', nullable: false, primary: true},
      device_id: {type: 'integer', nullable: false, unsigned: true},
      location_id: {type: 'integer', nullable: false, unsigned: true}
  }
};
module.exports = Schema;
