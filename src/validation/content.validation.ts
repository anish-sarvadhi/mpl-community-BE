import Joi from 'joi';

export const createContentSchema = Joi.object({
    contentId: Joi.string().required(),
    title: Joi.string().required(),
    excerpt: Joi.string().required(),
    category: Joi.string().required(),
    date: Joi.date().optional(),
    attachments: Joi.array().items(Joi.string().uri()),
    content: Joi.array()
        .items(
            Joi.object({
                type: Joi.string()
                    .valid('paragraph', 'heading', 'image', 'video')
                    .required(),
                content: Joi.string().allow(''),
                alt: Joi.string().optional(),
                caption: Joi.string().optional(),
                url: Joi.string().uri().optional(),
                title: Joi.string().optional(),
            })
        )
        .required(),
});

export const updateContentSchema = createContentSchema;
