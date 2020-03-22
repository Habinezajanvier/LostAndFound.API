import {Router} from 'express';
import Controller from '../controllers/controller';
import {foundsValidation, lostsValidation} from '../controllers/validator';

const router = new Router;

router.route('/found').post(foundsValidation, Controller.foundController);
router.route('/lost').post(lostsValidation ,Controller.lostController);
router.route('/lostfounds').get(Controller.lostAndfoundDoc);
router.route('/deliver').put(Controller.deleveringDoc);
router.route('/alllost').get(Controller.allLostDoc);
router.route('/allfound').get(Controller.allFoundDoc);

module.exports = router;