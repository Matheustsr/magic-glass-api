import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).required()
		}).noUnknown(),
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	},
	updateManager: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			manager_id: yup.string().min(1).transform(sanitizeValue).required()
		})
	},
	updateCompany: {
		params: yup.object({
			id: yup.number().required(),
			department_id: yup.number().required()
		}).noUnknown()
	}
};

export default {
	store: schema.store,
	find: schema.find,
	updateManager: schema.updateManager,
	updateCompany: schema.updateCompany
};
