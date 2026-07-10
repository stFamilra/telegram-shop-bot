import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import type { Product } from "../../types";
import { useCartStore } from "../../stores/cartStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {product.brand}
        </Typography>
        <Typography variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", my: 1 }}>
          <Chip label={product.condition} size="small" />
          {product.sizes.map((size) => (
            <Chip key={size} label={size} size="small" variant="outlined" />
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mt: 1 }}>
          <Typography variant="h6" color="primary">
            {product.price > 0
              ? `${product.price.toLocaleString()} ₽`
              : "Цена не указана"}
          </Typography>
          {product.oldPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {product.oldPrice.toLocaleString()} ₽
            </Typography>
          )}
        </Box>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          disabled={product.price === 0}
        >
          {product.price === 0 ? "Недоступно" : "Добавить в корзину"}
        </Button>
      </Box>
    </Card>
  );
};
