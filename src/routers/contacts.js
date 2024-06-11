import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateMongoId } from '../middlewares/validateId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkUserId } from '../middlewares/checkUserId.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  checkUserId,
  validateMongoId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  checkUserId,
  validateMongoId('contactId'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete(
  '/:contactId',
  checkUserId,
  validateMongoId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
