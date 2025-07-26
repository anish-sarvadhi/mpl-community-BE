// File: src/routes/content/content.routes.ts

import { verifyJWT_MW } from '../../config/middlewares';
import { END_POINT } from '../../constant/endpoint';
import { ContentController } from '../../controllers/contents';
import { createContentSchema, updateContentSchema } from '../../validation/content.validation';
// Modified/New Code
import { validateRequest } from '../../validation/helper';

// Modified/New Code
// Create a middleware wrapper for validateRequest
const validate = (schema) => (req, res, next) => validateRequest(req, next, schema);

export function initContentRoutes(app, router) {
    const apiRoute = router;

    const contentController = new ContentController();

    apiRoute.route('*').all(verifyJWT_MW);

    // Modified/New Code
    apiRoute.post('/', validate(createContentSchema), contentController.createContent);
    apiRoute.get('/', contentController.getAllContents);
    apiRoute.get('/:id', contentController.getContentById);
    // Modified/New Code
    apiRoute.put('/:id', validate(updateContentSchema), contentController.updateContent);
    apiRoute.delete('/:id', contentController.deleteContent);

    return apiRoute;
}
