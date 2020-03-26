export class Category {
  constructor(public id: number,
    public name: string) { }
}

export class Subcategory {
  constructor(public id: number,
    public category_id: number,
    public name: string) { }
}

export class Variants {
  constructor(public id: number,
    public category_id: number,
    public subcategory_id: number,
    public name: string) { }
}

export class Images {
  constructor(public id?: number,
    public image_path?: string,
    public zoomed_path?: number) { }
}

export class Product {
  constructor(public id: number,
    public name: string,
    public title: string,
    public images: Array<any>,
    public oldPrice: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public description: string,
    public availibilityCount: number,
    public cartCount: number,
    public color: Array<string>,
    public size: Array<string>,
    public category: Category,
    public subCategory: Subcategory,
    public variants: Array<Variant>,
    public weight: number,
    public userid: string,
    public seo: Array<SEO>,
    public is_free_shipment: boolean) { }
}

export class Deal {
  constructor(public id: number,
    public name: string,
    public title: string,
    public images: Array<any>,
    public oldPrice: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public description: string,
    public availibilityCount: number,
    public cartCount: number,
    public color: Array<string>,
    public size: Array<string>,
    public category: Category,
    public subCategory: Subcategory,
    public variants: Array<Variant>,
    public weight: number,
    public userid: string,
    public seo: Array<SEO>,
    public is_free_shipment: boolean) { }
}

export class SEO {
  constructor(
    public seo_id?: string,
    public product_id?: string,
    public seo_title?: string,
    public seo_description?: string
  ) { }
}

export class Variant {
  constructor(
    public id?: Number,
    public variant_id?: number,
    public title?: string,
    public description?: string,
    public price?: number,
    public discount_price?: number,
    public quantity?: string,
    public anag_variants?: Variants,
    public variant_details?: Array<Variants_Details>,
    public redirectUrl?: string,
    public images?: Array<Images>,
    public end_variant_date?: number,
    public start_variant_date?: number,
    public end_variant_date_as_date?: Date,
    public start_variant_date_as_date?: Date) { }
}

export class Variants_Details {
  constructor(
    public name?: string,
    public title?: string,
    public detail_id?: Number) { }
}

export class User {
  constructor(
    public id?: string,
    public username?: string,
    public name?: string,
    public surname?: string,
    public email?: string,
    public password?: string,
    public partner?: Partner) { }
}

export class Partner {
  constructor(
    public id?: string,
    public owner?: string, // Titolare / Rappresentante Legale
    public company_name?: string, // Ragione Sociale / Nome Ditta
    public fiscal_code?: string, // Codice Fiscale
    public vat?: string, // Partita IVA
    public activity_sector?: string, // Settore Attività
    public address_legal?: string, // Indirizzo sede legale
    public postal_code_legal?: string, // Cap Sede Legale
    public company_email?: string, // Email Aziendale
    public telephone_number?: string, // Telefono aziendale
    public address_operative?: string, // Indirizzo Sede Operativa
    public cap_operative?: string, // Cap Sede Operativa
    public partner_type?: string
  ) { }
}
