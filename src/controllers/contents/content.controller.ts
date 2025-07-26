import { Request, Response, NextFunction } from 'express';
import Content from '../../models/content.model';
import { logger } from '../../logger/Logger';

export class ContentController {

    async createContent(req: Request, res: Response, next: NextFunction) {
        try {
            const contentData = req.body.data || req.body;

            if (!contentData.date) {
                contentData.date = new Date();
            }

            logger.info(`Creating content with data: ${JSON.stringify(contentData)}`);

            const content = new Content(contentData);
            await content.save();
            return res.status(201).json({ success: true, data: content });
        } catch (error) {
            next(error);
        }
    };

    async getAllContents(req: Request, res: Response, next: NextFunction) {
        try {
            const { category } = req.query;
            const filter = category ? { category } : {};
            const contents = await Content.find(filter).sort({ createdAt: -1 });
            return res.status(200).json({ success: true, data: contents });
        } catch (error) {
            next(error);
        }
    };

    async getContentById(req: Request, res: Response, next: NextFunction) {
        try {
            const content = await Content.findById(req.params.id);
            if (!content) return res.status(404).json({ success: false, message: 'Content not found' });
            return res.status(200).json({ success: true, data: content });
        } catch (error) {
            next(error);
        }
    };

    async updateContent(req: Request, res: Response, next: NextFunction) {
        try {
            const contentData = req.body.data || req.body;

            const existingContent = await Content.findById(req.params.id);
            if (!existingContent) {
                return res.status(404).json({ success: false, message: 'Content not found' });
            }

            const updatedData = {
                ...existingContent.toObject(),
                ...contentData,
                date: contentData.date || new Date()
            };

            logger.info(`Updating content with ID ${req.params.id} and data: ${JSON.stringify(updatedData)}`);

            const updated = await Content.findByIdAndUpdate(
                req.params.id,
                updatedData,
                { new: true, runValidators: true }
            );

            return res.status(200).json({ success: true, data: updated });
        } catch (error) {
            logger.error(`Error updating content: ${error.message}`);
            if (error.errors) {
                Object.keys(error.errors).forEach(key => {
                    logger.error(`Field ${key}: ${error.errors[key].message}`);
                });
            }
            next(error);
        }
    }


    async deleteContent(req: Request, res: Response, next: NextFunction) {
        try {
            const deleted = await Content.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Content not found' });
            return res.status(200).json({ success: true, message: 'Content deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}