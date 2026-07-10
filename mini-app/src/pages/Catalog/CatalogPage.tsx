import { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CategoryFilter } from "../../components/CategoryFilter/CategoryFilter";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { useProductStore } from "../../stores/productStore";
import { useShallow } from "zustand/react/shallow";

export const CatalogPage = () => {
  const [search, setSearch] = useState("");
  const filteredProducts = useProductStore(
    useShallow((state) => state.filteredProducts()),
  );
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSearchQuery(value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Поиск по названию..."
        value={search}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 2 }}
      />
      <CategoryFilter />
      {filteredProducts.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          Товаров не найдено
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
