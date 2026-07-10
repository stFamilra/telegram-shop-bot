import { Tabs, Tab, Box } from "@mui/material";
import { useProductStore } from "../../stores/productStore";

const categories = ["ALL", "HOODIE", "SWEATER", "ZIP 1/4", "JACKET"];

export const CategoryFilter = () => {
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const setCategory = useProductStore((state) => state.setCategory);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue === "ALL" ? null : newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={selectedCategory || "ALL"}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {categories.map((cat) => (
          <Tab key={cat} label={cat} value={cat} />
        ))}
      </Tabs>
    </Box>
  );
};
