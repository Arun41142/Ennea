package ecommerce;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class ProductCatalog {
    private Map<Integer, Product> products;

    public ProductCatalog() {
        products = new HashMap<>();
        // Sample products
        products.put(1, new Product("iPhone 13", 999.99, "Electronics", 10));
        products.put(2, new Product("Samsung Galaxy S21", 799.99, "Electronics", 15));
        products.put(3, new Product("Dell XPS 13", 1199.99, "Laptops", 8));
        products.put(4, new Product("Nike Air Max", 120.00, "Footwear", 50));
        products.put(5, new Product("Adidas Ultraboost", 140.00, "Footwear", 30));
    }

    // Add a product to the catalog
    public void addProduct(int id, Product product) {
        products.put(id, product);
    }

    // Remove a product from the catalog
    public Product removeProduct(int id) {
        return products.remove(id);
    }

    // Search product by ID
    public Product searchProductById(int id) {
        return products.get(id);
    }

    // Search product by name
    public Product searchProductByName(String name) {
        for (Product product : products.values()) {
            if (product.getName().equalsIgnoreCase(name)) {
                return product;
            }
        }
        return null;
    }

    // Display all products
    public void displayProducts() {
        for (Map.Entry<Integer, Product> entry : products.entrySet()) {
            System.out.println("ID: " + entry.getKey() + " - " + entry.getValue());
        }
    }

    // Update stock of a product
    public void updateStock(int id, int newStock) {
        Product product = products.get(id);
        if (product != null) {
            product.setStock(newStock);
        } else {
            System.out.println("Product not found!");
        }
    }

    // Calculate total price of selected products
    public double calculateTotal(int[] productIds) {
        double total = 0;
        for (int id : productIds) {
            Product product = products.get(id);
            if (product != null && product.getStock() > 0) {
                total += product.getPrice();
                product.setStock(product.getStock() - 1); // Decrease stock
            }
        }
        return total;
    }

    // Main method to interact with the catalog
    public static void main(String[] args) {
        ProductCatalog catalog = new ProductCatalog();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n--- E-commerce Product Catalog ---");
            System.out.println("1. Display all products");
            System.out.println("2. Search product by ID");
            System.out.println("3. Search product by name");
            System.out.println("4. Add a product");
            System.out.println("5. Remove a product");
            System.out.println("6. Update stock");
            System.out.println("7. Buy products");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    catalog.displayProducts();
                    break;

                case 2:
                    System.out.print("Enter product ID: ");
                    int searchId = scanner.nextInt();
                    Product pById = catalog.searchProductById(searchId);
                    if (pById != null) {
                        System.out.println("Found: " + pById);
                    } else {
                        System.out.println("Product not found!");
                    }
                    break;

                case 3:
                    System.out.print("Enter product name: ");
                    scanner.nextLine(); // Consume newline
                    String searchName = scanner.nextLine();
                    Product pByName = catalog.searchProductByName(searchName);
                    if (pByName != null) {
                        System.out.println("Found: " + pByName);
                    } else {
                        System.out.println("Product not found!");
                    }
                    break;

                case 4:
                    System.out.print("Enter new product ID: ");
                    int newId = scanner.nextInt();
                    System.out.print("Enter product name: ");
                    scanner.nextLine(); // Consume newline
                    String newName = scanner.nextLine();
                    System.out.print("Enter product price: ");
                    double newPrice = scanner.nextDouble();
                    System.out.print("Enter product category: ");
                    scanner.nextLine(); // Consume newline
                    String newCategory = scanner.nextLine();
                    System.out.print("Enter product stock: ");
                    int newStock = scanner.nextInt();
                    catalog.addProduct(newId, new Product(newName, newPrice, newCategory, newStock));
                    break;

                case 5:
                    System.out.print("Enter product ID to remove: ");
                    int removeId = scanner.nextInt();
                    Product removedProduct = catalog.removeProduct(removeId);
                    if (removedProduct != null) {
                        System.out.println("Removed: " + removedProduct);
                    } else {
                        System.out.println("Product not found!");
                    }
                    break;

                case 6:
                    System.out.print("Enter product ID: ");
                    int updateId = scanner.nextInt();
                    System.out.print("Enter new stock value: ");
                    int newStockVal = scanner.nextInt();
                    catalog.updateStock(updateId, newStockVal);
                    break;

                case 7:
                    System.out.print("Enter the number of products to buy: ");
                    int numProducts = scanner.nextInt();
                    int[] productIds = new int[numProducts];
                    for (int i = 0; i < numProducts; i++) {
                        System.out.print("Enter product ID: ");
                        productIds[i] = scanner.nextInt();
                    }
                    double totalCost = catalog.calculateTotal(productIds);
                    System.out.println("Total cost: $" + totalCost);
                    break;

                case 0:
                    System.out.println("Exiting...");
                    break;

                default:
                    System.out.println("Invalid choice!");
                    break;
            }
        } while (choice != 0);

        scanner.close();
    }
}

