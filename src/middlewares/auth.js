import { AuthUtils } from '@utils';
import authConfig from '../config/auth';

export default class AuthMiddleware {
	static isAuthorized(req, res, next) {
		const errorResponse = {
			status: 'error',
			code: 403,
			message: 'Sessão expirada. Logue novamente no sistema para obter acesso.',
		};

		const token = AuthUtils.getBearerToken(req);
		const decodedToken = AuthUtils.decodeData(token, authConfig.secret);

		if (!decodedToken || !decodedToken.email || !decodedToken.id) {
			res.status(403).json(errorResponse);

			return;
		}

		req.auth = {
			user_id: decodedToken.id,
			company_id: decodedToken.company_id,
			email: decodedToken.email,
			user_role: decodedToken.user_tyrspe
		};

		if (decodedToken.user_type === 'MANAGER') {
			req.auth.is_manager = true
		}

		if (decodedToken.user_type === 'COMPANY_DIRECTOR') {
			req.auth.is_company_director = true
			req.auth.is_manager = true
		}

		next();
	}
}
