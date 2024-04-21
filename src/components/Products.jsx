import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Modal,
    TextField,
    Box,
} from '@mui/material';

const Products = ({ products, inventories, onEdit, onDelete }) => {
    const [editProduct, setEditProduct] = useState(null);

    const handleEdit = (product) => {
        setEditProduct(product);
    };

    const handleDelete = (id) => {
        onDelete(id);
    };

    const handleCloseEditModal = () => {
        setEditProduct(null);
    };

    const handleEditSubmit = () => {
        onEdit(editProduct);
        setEditProduct(null);
    };

    const combinedData = products.map(product => ({
        ...product,
        ...(inventories.find(inventory => inventory.product_id === product.id) || {})
      }));
      console.log(inventories)
      console.log(combinedData)
    return (
        <>
        <List sx={{ display: 'flex', gap: 5, flexDirection: 'column', maxWidth: '50%', m: 5 }}>
        {combinedData.map((product) => {
    // Преобразуем JSON-объекты инвентаря в массив
    const inventoriesArray = Array.isArray(inventories) ? inventories : [inventories];

    // Найдем соответствующий инвентарь для текущего продукта
    const inventory = inventoriesArray.find((inv) => inv.product_id === product.id);
    console.log(inventory)

    return (
        <ListItem key={product.id} sx={{ backgroundColor: '#393939' }}>
            <ListItemText
                primary={product.name}
                secondary={
                    <>
                        <Typography variant="body2" color="textPrimary" component="span">
                            Срок годности: {product.expiry_date}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textPrimary" component="span">
                            Объем: {product.volume}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textPrimary" component="span">
                            Вес: {product.weight}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textPrimary" component="span">
                            Количество: {inventory ? inventory.quantity : 'N/A'}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="textPrimary" component="span">
                            Условия: {inventory ? inventory.optimal_stock_levels : 'N/A'}
                        </Typography>
                    </>
                }
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button onClick={() => handleEdit(product)} variant="contained">
                    Редактировать
                </Button>
                <Button onClick={() => handleDelete(product.id)} variant="contained" color="error">
                    Удалить
                </Button>
            </Box>
        </ListItem>
    );
})}

        </List>

            {/* Модальное окно для редактирования продукта */}
            <Modal open={Boolean(editProduct)} onClose={handleCloseEditModal}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#323232', boxShadow: 24, p: 4, maxWidth: 400, display: "flex",
                    flexDirection: "column", gap: 5
                }}>
                    <Typography variant="h6" gutterBottom>
                        Редактировать продукт
                    </Typography>
                    <TextField
                        label="Название"
                        fullWidth
                        value={editProduct ? editProduct.name : ''}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        InputLabelProps={{ style: { color: '#FF8354' } }}
                        InputProps={{
                            sx: {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            }
                        }}
                    />
                    <TextField
                        label="Срок годности"
                        fullWidth
                        value={editProduct ? editProduct.expiry_date : ''}
                        onChange={(e) => setEditProduct({ ...editProduct, expiry_date: e.target.value })}
                        InputLabelProps={{ style: { color: '#FF8354' } }}
                        InputProps={{
                            sx: {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            }
                        }}
                    />
                    <TextField
                        label="Объем"
                        fullWidth
                        value={editProduct ? editProduct.volume : ''}
                        onChange={(e) => setEditProduct({ ...editProduct, volume: e.target.value })}
                        InputLabelProps={{ style: { color: '#FF8354' } }}
                        InputProps={{
                            sx: {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            }
                        }}
                    />
                    <TextField
                        label="Вес"
                        fullWidth
                        value={editProduct ? editProduct.weight : ''}
                        onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })}
                        InputLabelProps={{ style: { color: '#FF8354' } }}
                        InputProps={{
                            sx: {
                                '& fieldset': { borderColor: 'white' },
                                '&:hover fieldset': { borderColor: 'white' },
                                '&.Mui-focused fieldset': { borderColor: 'white' },
                            }
                        }}
                    />
                    <Button onClick={handleEditSubmit} variant='contained'>Сохранить</Button>
                </Box>
            </Modal>
        </>
    );
};

Products.propTypes = {
    products: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    inventories: PropTypes.array.isRequired,
};

export default Products;
