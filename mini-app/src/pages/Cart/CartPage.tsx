import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total()); // вызываем функцию, получаем число

  if (items.length === 0) {
    return (
      <Container sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Корзина пуста
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Перейти в каталог
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      <List>
        {items.map((item) => (
          <div key={item.product.id}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={() => removeItem(item.product.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={item.product.name}
                secondary={`${item.product.brand} | ${item.product.condition} | ${item.product.sizes.join(", ")}`}
              />
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mx: 2 }}
              >
                <IconButton
                  size="small"
                  onClick={() => decreaseQuantity(item.product.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => increaseQuantity(item.product.id)}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Typography
                variant="body1"
                sx={{ minWidth: 100, textAlign: "right" }}
              >
                {(item.product.price * item.quantity).toLocaleString()} ₽
              </Typography>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="h5">Итого: {total.toLocaleString()} ₽</Typography>
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={clearCart}
            sx={{ mr: 1 }}
          >
            Очистить корзину
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/checkout")}
          >
            Оформить заказ
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
