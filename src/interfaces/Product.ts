export default interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: Rating;
}

type Rating = {
  count: number;
  rate: number;
}