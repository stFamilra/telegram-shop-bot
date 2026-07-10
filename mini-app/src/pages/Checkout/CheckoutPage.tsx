import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useCartStore } from "../../stores/cartStore";
import { useTelegram } from "../../hooks/useTelegram";

const checkoutSchema = z.object({
  name: z.string().min(2, "Имя обязательно (минимум 2 символа)"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  address: z.string().optional(),
  comment: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, sendData } = useTelegram();

  // ✅ Отдельные селекторы (без создания объекта)
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total());
  const clearCart = useCartStore((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: user?.first_name || "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  // ✅ Редирект вынесен в эффект, чтобы не вызывать navigate во время рендера
  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items.length, navigate]);

  // Если корзина пуста – ничего не рендерим (эффект сделает редирект)
  if (items.length === 0) {
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    const order = {
      user: {
        id: user?.id,
        username: user?.username,
        firstName: user?.first_name,
        lastName: user?.last_name,
      },
      items: items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        total: item.product.price * item.quantity,
      })),
      total: total,
      customer: {
        name: data.name,
        phone: data.phone,
        address: data.address || "",
        comment: data.comment || "",
      },
      createdAt: new Date().toISOString(),
    };

    sendData(order);
    clearCart();
    alert("Заказ отправлен! Ожидайте подтверждения.");
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Оформление заказа
        </Typography>

        <List dense>
          {items.map((item) => (
            <ListItem key={item.product.id}>
              <ListItemText
                primary={item.product.name}
                secondary={`${item.product.brand} | ${item.product.condition} | ${item.product.sizes.join(", ")}`}
              />
              <Typography variant="body2">
                {item.quantity} x {item.product.price.toLocaleString()} ₽
              </Typography>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText primary="Итого" />
            <Typography variant="h6">{total.toLocaleString()} ₽</Typography>
          </ListItem>
        </List>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Имя *"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Телефон *"
            margin="normal"
            placeholder="+7 999 123-45-67"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            fullWidth
            label="Адрес (необязательно)"
            margin="normal"
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            fullWidth
            label="Комментарий к заказу"
            margin="normal"
            multiline
            rows={3}
            {...register("comment")}
            error={!!errors.comment}
            helperText={errors.comment?.message}
          />
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/cart")}
            >
              Назад
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Подтвердить заказ"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
