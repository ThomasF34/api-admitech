import Candidature = require('../models/candidature');
import userController = require('./user.controller');
import User = require('../models/user');
import logger = require('../helpers/logger');
import Crypto = require('crypto-js')

const STATUS_SEND_MAIL = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const ENCRYPTING_KEY = process.env.MAIL_SERVICE_ENCRYPT_KEY;
const NODE_ENV = process.env.NODE_ENV || 'development';

async function sendMailIfNeeded(cand: Candidature, newStatus: number) {
  if (!['production', 'staging'].includes(NODE_ENV)) return;

  const user = await User.findByPk(cand.UserId);
  if (user === null) logger.warn([`User ${cand.UserId} not found while trying to send email`, cand, newStatus]);

  if (STATUS_SEND_MAIL.includes(newStatus)) {
    const bodyToSend = { email: user!.email, subject: 'TODO', content: 'TODO' };
    Crypto.AES.encrypt(JSON.stringify(bodyToSend), ENCRYPTING_KEY!);
  }


}

export = { sendMailIfNeeded };