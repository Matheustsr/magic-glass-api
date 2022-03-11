import * as yup from 'yup';
import { sanitizeValue } from './utils';

const schema = {
	store: {
		body: yup.object({
			name: yup.string().min(1).transform(sanitizeValue).required(),
			email: yup.string().min(1).transform(sanitizeValue).required(),
			user_type: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['MANAGER', 'EMPLOYEE', 'COMPANY_DIRECTOR']).required(),
			birth_date: yup.string().min(1).required(),
			gender: yup.string().min(1).required(),
			hire_date: yup.string().min(1).transform(sanitizeValue),
			password: yup.string().min(1).required()
		}).noUnknown(),
	},
	find: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown()
	},
	updateDepartment: {
		params: yup.object({
			user_id: yup.number().required(),
			department_id: yup.number().required()
		}).noUnknown()
	},
	updateCompany: {
		params: yup.object({
			user_id: yup.number().required(),
			company_id: yup.number().required()
		}).noUnknown()
	},
	updateRole: {
		params: yup.object({
			id: yup.number().required()
		}).noUnknown(),
		body: yup.object({
			user_type: yup.string().transform(sanitizeValue).max(255)
				.oneOf(['MANAGER', 'EMPLOYEE', 'COMPANY_DIRECTOR']).required()
		})
	}

};

export default {
	store: schema.store,
	find: schema.find,
	updateDepartment: schema.updateDepartment,
	updateCompany: schema.updateCompany,
	updateRole: schema.updateRole
};
