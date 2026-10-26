import { Category, Product } from "./types";
import { makeImage } from "./utils";

const IMAGES: Record<number, string> = {
  1: "https://tse1.mm.bing.net/th/id/OIP.ihj_Omuv9Jr9_Cnbjo9XPAHaHa?r=0&pid=Api&h=220&P=0",
  2: "https://tse1.mm.bing.net/th/id/OIP.ivCluC-GEh39oS8-k11uKwHaHa?r=0&pid=Api&h=220&P=0",
  3: "https://tse2.mm.bing.net/th/id/OIP.TfHQS6FPRP7HHCIDs1ZgnwHaHa?r=0&pid=Api&h=220&P=0",
  4: "https://img.lazcdn.com/g/p/e2687128f8f01032c92c9afb15468f25.jpg_720x720q80.jpg",
  5: "https://image-optimizer-reg.production.sephora-asia.net/images/article_images/8_Article_810041818188-ONESIZE-Ultimate-Setting-Powder-LifeStyle_04d37c793acec0e726cb93fab4a26ddb60581a8a_178592608380220260805-1-dd3r4w.jpg",
  6: "https://tse3.mm.bing.net/th/id/OIP.u4rIB6EX8mmEIlsn4PwAgQHaLG?r=0&pid=Api&h=220&P=0",
  7: "https://tse1.mm.bing.net/th/id/OIP.JfT3RrZ20ir13993ce7dbgHaLH?r=0&pid=Api&h=220&P=0",
  8: "https://www.jockey.com.ph/cdn/shop/files/9-A12728000-_blue_grande.jpg?v=1785207149",
  9: "https://cultmia.com/cdn/shop/files/Artboard32.jpg?v=1748780153&width=3840",
  10: "https://cdn.sewmamasew.com/wp-content/uploads/2026/05/Spring-maxi-dress-with-pastel-cardigan.jpg",
  11: "https://cdn.shopify.com/s/files/1/0054/9040/9585/collections/20240423-DSC06953_08cfbaa8-3983-4309-81e3-5e78a7b626d9.jpg",
  12: "https://cms.cloudinary.vpsvc.com/images/if_ar_gt_1.1/c_scale,t_pdpHeroGallery_Gallery/if_else/c_scale,w_816/if_end/f_auto,q_auto:best,dpr_1.0/bynder-assets/4BA2A483-5E1B-4E0E-81D9F3766656859E/4BA2A483-5E1B-4E0E-81D9F3766656859E?cb=1786013118",
  13: "https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/489236/sub/phgoods_489236_sub3_3x4.jpg?width=600",
  14: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzPmBoloK7cRCALvYmI954_cHuebTSsn0sISTZuHZ-w&s=10",
  15: "https://image.made-in-china.com/2f0j00UcvurZAtggpB/Travel-Backpacks-Men-Waterproof-Male-Leather-Backpack-for-Men-Travel-School-Laptop-Bag.webp",
};

const make = (
  id: number, name: string, category: Category, price: number, quantity: number,
  rating: number, color: string, description: string, specifications: string
): Product => ({
  id, name, category, price, quantity, rating, description, specifications,
  image: IMAGES[id] ?? makeImage(name, color),
});

export const initialProducts: Product[] = [
  make(1, "Matte Lipstick", "Makeup", 12.5, 20, 4.5, "#f4b6c2", "Long-lasting matte color that feels light on the lips.", "Shade: Rose, Weight: 3.5 g, Finish: Matte"),
  make(2, "Liquid Foundation", "Makeup", 24, 3, 4.2, "#f2d3b8", "Medium coverage foundation with a natural finish.", "Volume: 30 ml, Coverage: Medium, SPF 15"),
  make(3, "Eyeshadow Palette", "Makeup", 32, 12, 4.7, "#d9b8e6", "Twelve blendable shades from soft neutrals to bold colors.", "Shades: 12, Finish: Matte and shimmer, Vegan"),
  make(4, "Volume Mascara", "Makeup", 14, 4, 4, "#c9c9d6", "Adds volume and length without clumping.", "Volume: 9 ml, Waterproof, Color: Black"),
  make(5, "Setting Powder", "Makeup", 18, 15, 4.3, "#f7e4c8", "Lightweight powder that keeps makeup in place all day.", "Weight: 10 g, Finish: Soft focus, Oil control"),
  make(6, "Denim Jacket", "Clothing", 59, 8, 4.6, "#9db9d6", "Classic denim jacket with a relaxed fit.", "Material: Cotton denim, Sizes: S-L, Machine washable"),
  make(7, "White Blazer", "Clothing", 75, 2, 4.8, "#e8e8ee", "Tailored blazer for work or evening outfits.", "Material: Polyester blend, Fit: Slim, Lined"),
  make(8, "Cotton T-Shirt", "Clothing", 19, 30, 4.1, "#b7dcc8", "Soft everyday T-shirt in breathable cotton.", "Material: 100% cotton, Sizes: S-XL, Short sleeve"),
  make(9, "Floral Dress", "Clothing", 49, 6, 4.4, "#f3c4d0", "Light summer dress with a flowing skirt.", "Material: Chiffon, Length: Knee, Sizes: S-L"),
  make(10, "Knit Cardigan", "Clothing", 42, 9, 4.5, "#e6d5c3", "Cozy open-front cardigan for cooler days.", "Material: Acrylic knit, Color: Beige, One size"),
  make(11, "Leather Watch", "Accessories", 89, 5, 4.9, "#c8b8a6", "Analog watch with a genuine leather strap.", "Case: 38 mm, Strap: Leather, Water resistant"),
  make(12, "Canvas Handbag", "Accessories", 64, 7, 4.3, "#e4d7bd", "Spacious handbag with a sturdy leather handle.", "Material: Canvas, Pockets: 3, Closure: Zipper"),
  make(13, "Silk Scarf", "Accessories", 22, 14, 4, "#f0b8c8", "Smooth printed scarf that adds color to any outfit.", "Size: 90 x 90 cm, Material: Silk blend"),
  make(14, "Sunglasses", "Accessories", 35, 1, 4.2, "#bfc7d1", "Lightweight frames with UV protection.", "Lens: UV400, Frame: Acetate, Includes case"),
  make(15, "Leather Backpack", "Accessories", 78, 10, 4.6, "#b9a28c", "Compact backpack that fits a tablet and daily items.", "Material: Leather, Capacity: 12 L, Padded straps"),
];
