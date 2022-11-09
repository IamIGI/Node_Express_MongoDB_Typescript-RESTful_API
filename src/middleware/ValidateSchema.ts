import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IAuthorModel } from '../models/Author.model';
import { IBookModel } from '../models/Book.model';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthorModel>({
            name: Joi.string().required()
        }),
        update: Joi.object<IAuthorModel>({
            name: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBookModel>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBookModel>({
            author: Joi.string()
                .regex(/^[0-9a-fA-F]{24}/)
                .required(),
            title: Joi.string().required()
        })
    }
};
