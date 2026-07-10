import { Badge, Fab } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/cartStore";

export const CartButton = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: 24, right: 24 }}
      onClick={() => navigate("/cart")}
    >
      <Badge badgeContent={totalItems} color="error">
        <ShoppingCartIcon />
      </Badge>
    </Fab>
  );
};
