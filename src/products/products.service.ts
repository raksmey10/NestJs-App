import { PaginationParamProductDto } from './dto/pagination-param.dto';
import { Model } from 'mongoose';
import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
	NotImplementedException,
	Delete,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name) private readonly productModel: Model<Product>,
	) {}

	async create(createProductDto: CreateProductDto) {
		const createProduct = new this.productModel(createProductDto);
		return await createProduct.save();
	}

	async findAll(paginationParam: PaginationParamProductDto) {
		let options = {};

		if (paginationParam.search) {
			options = {
				$or: [{ name: new RegExp(paginationParam.search.toString(), 'i') }],
			};
		}

		const page = paginationParam.page || 1;
		const limit = paginationParam.limit;
		const sort = { _id: paginationParam.sort || 'asc' };
		const total = await this.productModel.count(options);
		const lastPage = Math.ceil(total / limit);
		const from = (page - 1) * limit + 1;
		const to = page * limit;

		const items = await this.productModel
			.find(options)
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.exec();

		return { items, page, limit, from, to, total, lastPage };
	}

	// async findAll(page?: number, limit?: number, search?: string): Promise<any> {
	// async findAll(paginationParam: PaginationParamProductDto): Promise<any> {
	//   const limit = paginationParam.limit;
	//   const search = paginationParam.search;
	//   const page = paginationParam.page;
	//   const countItems = await this.productModel.count();
	//   const countPages = (countItems / limit).toFixed();

	//   let filter = {};
	//   if (search) {
	//     filter = {
	//       $or: [{ name: new RegExp(search.toString(), 'i') }],
	//     };
	//   }

	//   const query = await this.productModel
	//                           .find(filter)
	//                           .sort({ _id: -1 })
	//                           .skip((page - 1) * limit)
	//                           .limit(limit)
	//                           .exec();
	//   if (!query) {
	//     throw new NotFoundException();
	//   }
	//   return { query, countItems, countPages };
	// }

	async findOne(id: string): Promise<Product> {
		const findProduct = await this.productModel.findOne({ _id: id }).exec();
		if (!findProduct) {
			Logger.warn('warning', 'findOne function has a problem');
			throw new BadRequestException(
				`There is a problem while finding a product`,
			);
		}

		return findProduct;
	}

	async update(updateProductDto: UpdateProductDto): Promise<Product> {
		const id = updateProductDto.id;
		if (!Types.ObjectId.isValid(id))
			throw new BadRequestException(`Invalid ObjectId: ${id}`);

		const existingItem = await this.productModel.findByIdAndUpdate(
			id,
			updateProductDto,
			{ new: true },
		);

		if (!existingItem) {
			throw new NotFoundException(`Product #${id} not found`);
		}
		return existingItem;
	}

	async remove(id: string): Promise<Product> {
		if (!Types.ObjectId.isValid(id))
			throw new BadRequestException(`Invalid ObjectId: ${id}`);

		const remove = await this.productModel.findByIdAndRemove(id);
		if (!remove) {
			throw new NotFoundException(`Item does not exist, ${id}`);
		}

		return remove;
	}

	async removeMany(_ids: string[]) {
		for (const id of _ids) {
			if (!Types.ObjectId.isValid(id))
				throw new BadRequestException(`Invalid ObjectId: ${id}`);

			const items = await this.productModel.findById(id).exec();
			if (items === null) throw new NotFoundException(`Items not found: ${id}`);

			await this.productModel.findByIdAndRemove(id);
		}

		return true;
	}
}
