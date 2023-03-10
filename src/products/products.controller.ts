import { PaginationParamProductDto } from './dto/pagination-param.dto';
import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	HttpStatus,
	UseGuards,
	Res,
	UseInterceptors,
	UploadedFile,
	HttpCode,
	HttpException,
	ParseFilePipe,
	MaxFileSizeValidator,
	FileTypeValidator,
	ParseFilePipeBuilder,
	Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/utils/guards/JwtGuard.guard';
import { SkipThrottle } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageDto } from './dto/upload-image.dto';
import { diskStorage } from 'multer';

// @UseGuards(JwtAuthGuard)
@SkipThrottle()
@Controller('products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService
	) {}

	@Post('create')
	async create(
		@Res() res: any,
		@Body() createProductDto: CreateProductDto,
	): Promise<Product> {
		try {
			const result = await this.productsService.create(createProductDto);
			return res.status(HttpStatus.OK).json({
				success: 1,
				status: HttpStatus.OK,
				message: `Product created successfully`,
				data: {
					items: result,
				},
			});
		} catch (err) {
			return res.status(err.status).json(err.response);
		}
	}

	// @Post()
	// async findAllItems(@Req() req: Request) {
	//   // console.log(req.query.params)
	//   const page: number = parseInt(req.query.page as any);
	//   const limit: number = parseInt(req.query.limit as any);
	//   // const sort: string = req.query.sort.toString() as string
	//   // console.log(limit);
	//   const result = await this.productsService.findAll(page, limit);
	//   return {
	//     items: result.query,
	//     totalItems: result.countItems,
	//     totalPages: result.countPages
	//   }
	// }

	@Post('get')
	async findAll(
		@Res() res: any,
		@Body() paginationParam: PaginationParamProductDto,
	): Promise<Product> {
		try {
			return res.status(HttpStatus.OK).json({
				success: 1,
				message: 'All items found',
				status: HttpStatus.OK,
				data: await this.productsService.findAll(paginationParam),
			});
		} catch (err) {
			return res.status(err.status).json(err.response);
		}
	}

	// @Get(':id')
	// async findOne(@Res() res, @Param('id') id: string): Promise<Product> {
	// 	let ObjectId = Types.ObjectId;
	// 	if (!ObjectId.isValid(id)) {
	// 		return res.status(HttpStatus.NOT_FOUND).json({
	// 			error: 1,
	// 			message: `Product Id Not Found (id: ${id})`,
	// 			status: HttpStatus.NOT_FOUND,
	// 		});
	// 	}
	//
	// 	try {
	// 		const findProductById = await this.productsService.findOne(id);
	// 		return res.status(HttpStatus.OK).json({
	// 			success: 1,
	// 			message: `Product Found`,
	// 			status: HttpStatus.OK,
	// 			findProductById,
	// 		});
	// 	} catch (err) {
	// 		return res.status(err.status).json(err.response);
	// 	}
	// }

	@Patch('update')
	// async update(@Res() res: any, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
	async update(
		@Res() res: any,
		@Body() updateProductDto: UpdateProductDto,
	): Promise<Product> {
		try {
			return res.status(HttpStatus.OK).json({
				success: 1,
				message: 'Product updated successfully',
				statusCode: HttpStatus.OK,
				data: {
					items: await this.productsService.update(updateProductDto),
				},
			});
		} catch (err) {
			return res.status(err.status).json(err.response);
		}
	}

	@Post('delete')
	async remove(@Res() res: any, @Body('id') id: string): Promise<Product> {
		try {
			return res.status(HttpStatus.OK).json({
				success: 1,
				message: 'Product deleted successfully',
				status: HttpStatus.OK,
				data: {
					items: await this.productsService.remove(id),
				},
			});
		} catch (err) {
			return res.status(err.status).json(err.response);
		}
	}

	@Post('delete/many')
	async removeMulti(@Res() res: any, @Body('id') _ids: string[]) {
		try {
			return res.status(HttpStatus.OK).json({
				success: 1,
				message: 'Products deleted successfully',
				status: HttpStatus.OK,
				data: await this.productsService.removeMany(_ids),
			});
		} catch (err) {
			return res.status(err.status).json(err.response);
		}
	}

	// @Post('upload')
	// @UseInterceptors(FileInterceptor('file'))
	// async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
	// 	return {
	// 		success: 1,
	// 		message: 'Image uploaded successfully',
	// 		data: await this.awsS3Service.uploadFile(file),
	// 	};
	// }

	// @HttpCode(200)
	// // upload base64 encoded file image
	// @Post('upload/image/base64')
	// async uploadImage(@Body() uploadImageDto: UploadImageDto): Promise<any> {
	// 	return {
	// 		statusCode: HttpStatus.OK,
	// 		success: true,
	// 		message: 'Image uploaded successfully',
	// 		data: {
	// 			item: await this.awsS3Service.uploadFileBase64(
	// 				uploadImageDto.imageFile,
	// 			),
	// 		},
	// 	};
	// }

	// @Post('upload/image/dropbox')
	// @UseInterceptors(FileInterceptor('file'))
	// async uploadImageDropbox(
	// 	@UploadedFile() file: Express.Multer.File,
	// ): Promise<any> {
	// 	return await this.awsS3Service.uploadToDropbox(file);
	// }

	// upload to local storage
	@Post('upload/local')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: (req, file, cb) => {
					cb(null, './uploads');
				},
				filename: (req, file, cb) => {
					const fileNameSplit = file.originalname.split('.');
					const fileExt = fileNameSplit[fileNameSplit.length - 1];

					let filename = '';
					const characters =
						'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
					const charactersLength = characters.length;
					for (let i = 0; i < 40; i++) {
						filename += characters.charAt(
							Math.floor(Math.random() * charactersLength),
						);
					}

					cb(null, `${filename}.${fileExt}`);
				},
			}),
			fileFilter: (req, file, cb) => {
				const fileNameSplit = file.originalname.split('.');
				const ext = fileNameSplit[fileNameSplit.length - 1];
				if (ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
					return cb(
						new HttpException(
							'Only images are allowed!',
							HttpStatus.BAD_REQUEST,
						),
						null,
					);
				}
				cb(null, true);
			},
			limits: { files: 1, fileSize: 512000 },
		}),
	)
	async uploadLocalStorage(
		@Res() res,
		@UploadedFile() file: Express.Multer.File,
	): Promise<any> {
		try {
			return {
				success: true,
				status: HttpStatus.OK,
				data: {
					filename: file.filename,
					path: file.path,
				},
			};
		} catch (err) {
			console.error(err);
			return res.status(err.status).json(err.response);
		}
	}

	// @Post('upload/local')
	// @UseInterceptors(
	// 	FileInterceptor('file', {
	// 		storage: diskStorage({
	// 			destination: (req, file, cb) => {
	// 				cb(null, './uploads');
	// 			},
	// 			filename: (req, file, cb) => {
	// 				const fileNameSplit = file.originalname.split('.');
	// 				const fileExt = fileNameSplit[fileNameSplit.length - 1];
	//
	// 				let filename = '';
	// 				const characters =
	// 					'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	// 				const charactersLength = characters.length;
	// 				for (let i = 0; i < 40; i++) {
	// 					filename += characters.charAt(
	// 						Math.floor(Math.random() * charactersLength),
	// 					);
	// 				}
	//
	// 				cb(null, `${filename}.${fileExt}`);
	// 			},
	// 		}),
	// 	}),
	// )
	// async uploadLocalStorage(
	// 	@UploadedFile(
	// 		new ParseFilePipeBuilder()
	// 			.addFileTypeValidator({
	// 				fileType: /(jpg|jpeg|png|gif)$/, //'jpeg, png, jpg, gif',
	// 			})
	// 			.addMaxSizeValidator({
	// 				maxSize: 512000, // 500KB
	// 			})
	// 			.build({
	// 				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
	// 			}),
	// 	)
	// 	file: Express.Multer.File,
	// ): Promise<any> {
	// 	console.log(file);
	// 	return file;
	// }

	// generate random strings
	generateString(length: number) {
		let result = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
