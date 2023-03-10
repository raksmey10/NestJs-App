import { IsBase64, IsOptional } from 'class-validator';

export class UploadImageDropboxDto {
	@IsBase64()
	@IsOptional()
	imageFile: String;
}
