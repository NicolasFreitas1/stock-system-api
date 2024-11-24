import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { ApiProperty } from '@nestjs/swagger'
import { z } from 'zod'

const createSaleBodySchema = z.object({
  quantity: z.number(),
  productId: z.string().uuid(),
  soldAt: z
    .string()
    .transform((a) => new Date(a))
    .pipe(z.date()),
  sellerId: z.string().uuid(),
})

type CreateSaleBodySchema = z.infer<typeof createSaleBodySchema>

export const bodyValidationPipe = new ZodValidationPipe(createSaleBodySchema)

export class CreateSaleDTO implements CreateSaleBodySchema {
  @ApiProperty()
  productId: string

  @ApiProperty()
  quantity: number

  @ApiProperty()
  soldAt: Date

  @ApiProperty()
  sellerId: string
}
