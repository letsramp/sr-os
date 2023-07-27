//
// Autogenerated by Thrift Compiler (0.16.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;
var Int64 = require('node-int64');


var ttypes = require('./demo_types');
//HELPER FUNCTIONS AND STRUCTURES

var PaymentService_Charge_args = function(args) {
  this.amount = null;
  this.credit_card = null;
  if (args) {
    if (args.amount !== undefined && args.amount !== null) {
      this.amount = new ttypes.Money(args.amount);
    }
    if (args.credit_card !== undefined && args.credit_card !== null) {
      this.credit_card = new ttypes.CreditCardInfo(args.credit_card);
    }
  }
};
PaymentService_Charge_args.prototype = {};
PaymentService_Charge_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.amount = new ttypes.Money();
        this.amount.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRUCT) {
        this.credit_card = new ttypes.CreditCardInfo();
        this.credit_card.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PaymentService_Charge_args.prototype.write = function(output) {
  output.writeStructBegin('PaymentService_Charge_args');
  if (this.amount !== null && this.amount !== undefined) {
    output.writeFieldBegin('amount', Thrift.Type.STRUCT, 1);
    this.amount.write(output);
    output.writeFieldEnd();
  }
  if (this.credit_card !== null && this.credit_card !== undefined) {
    output.writeFieldBegin('credit_card', Thrift.Type.STRUCT, 2);
    this.credit_card.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var PaymentService_Charge_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = args.success;
    }
  }
};
PaymentService_Charge_result.prototype = {};
PaymentService_Charge_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PaymentService_Charge_result.prototype.write = function(output) {
  output.writeStructBegin('PaymentService_Charge_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var PaymentServiceClient = exports.Client = function(output, pClass) {
  this.output = output;
  this.pClass = pClass;
  this._seqid = 0;
  this._reqs = {};
};
PaymentServiceClient.prototype = {};
PaymentServiceClient.prototype.seqid = function() { return this._seqid; };
PaymentServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };

PaymentServiceClient.prototype.Charge = function(amount, credit_card, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_Charge(amount, credit_card);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_Charge(amount, credit_card);
  }
};

PaymentServiceClient.prototype.send_Charge = function(amount, credit_card) {
  var output = new this.pClass(this.output);
  var params = {
    amount: amount,
    credit_card: credit_card
  };
  var args = new PaymentService_Charge_args(params);
  try {
    output.writeMessageBegin('Charge', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

PaymentServiceClient.prototype.recv_Charge = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new PaymentService_Charge_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('Charge failed: unknown result');
};
var PaymentServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
};
PaymentServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
};
PaymentServiceProcessor.prototype.process_Charge = function(seqid, input, output) {
  var args = new PaymentService_Charge_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.Charge.length === 2) {
    Q.fcall(this._handler.Charge.bind(this._handler),
      args.amount,
      args.credit_card
    ).then(function(result) {
      var result_obj = new PaymentService_Charge_result({success: result});
      output.writeMessageBegin("Charge", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
      output.writeMessageBegin("Charge", Thrift.MessageType.EXCEPTION, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.Charge(args.amount, args.credit_card, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new PaymentService_Charge_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("Charge", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("Charge", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};