CREATE DATABASE Book
GO

USE Book
GO

-- Tạo bảng Tác giả (Authors)
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Biography NVARCHAR(MAX),
    Nationality NVARCHAR(100)
);

-- Tạo bảng Nhà cung cấp (Suppliers)
CREATE TABLE Suppliers (
    SupplierID INT PRIMARY KEY IDENTITY(1,1),
    SupplierName NVARCHAR(255) NOT NULL,
    ContactInfo NVARCHAR(255),
    Address NVARCHAR(500),
    PhoneNumber NVARCHAR(15)
);


-- Tạo bảng Sách (Books)
CREATE TABLE Books (
    BookID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    AuthorID INT FOREIGN KEY REFERENCES Authors(AuthorID) ON DELETE SET NULL,
    Genre NVARCHAR(100),
    PublicationDate DATE,
    Price DECIMAL(10, 2) NOT NULL CHECK (Price > 0),
    Description NVARCHAR(MAX),
    StockQuantity INT NOT NULL CHECK (StockQuantity >= 0),
    ImageURL NVARCHAR(500),
    Publisher NVARCHAR(255),
    ISBN NVARCHAR(13) UNIQUE,
	SupplierID INT FOREIGN KEY REFERENCES Suppliers(SupplierID)
);


-- Tạo bảng Khách hàng (Customers)
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(15),
    Address NVARCHAR(500),
    PasswordHash NVARCHAR(255) NOT NULL
);

-- Tạo bảng Đơn hàng (Orders)
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
    TotalPrice DECIMAL(10, 2) NOT NULL,
    OrderStatus NVARCHAR(50) NOT NULL,
    ShippingAddress NVARCHAR(500),
    PaymentMethod NVARCHAR(50)
);

-- Tạo bảng Chi tiết đơn hàng (OrderDetails)
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID) ON DELETE CASCADE,
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL CHECK (UnitPrice > 0)
);

-- Tạo bảng Thanh toán (Payments)
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    PaymentDate DATETIME NOT NULL DEFAULT GETDATE(),
    PaymentMethod NVARCHAR(50),
    Amount DECIMAL(10, 2) NOT NULL
);


-- Tạo bảng Nhân viên (Employees)
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Position NVARCHAR(100),
    Salary DECIMAL(10, 2),
    HireDate DATE NOT NULL DEFAULT GETDATE(),
    Email NVARCHAR(255),
    PhoneNumber NVARCHAR(15)
);

-- Tạo bảng Đánh giá sách (BookReviews)
CREATE TABLE BookReviews (
    ReviewID INT PRIMARY KEY IDENTITY(1,1),
    BookID INT FOREIGN KEY REFERENCES Books(BookID),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    ReviewContent NVARCHAR(MAX),
    Rating INT CHECK (Rating >= 1 AND Rating <= 5),
    ReviewDate DATETIME NOT NULL DEFAULT GETDATE()
);

-- Tạo bảng Blog
CREATE TABLE Blog (
    BlogID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    AuthorID INT, -- Tùy thuộc vào hệ thống tác giả của bạn
    AuthorType NVARCHAR(50), -- Có thể là 'Customer' hoặc 'Employee'
    PublishedDate DATETIME NOT NULL DEFAULT GETDATE(),
    Status NVARCHAR(50) CHECK (Status IN ('Draft', 'Published', 'Archived')),
    Tags NVARCHAR(255), -- Các tag cho bài viết, có thể lưu dưới dạng chuỗi phân tách bằng dấu phẩy
    ImageURL NVARCHAR(500)
);

-- Nếu muốn liên kết tác giả với bảng Employees hoặc Customers
ALTER TABLE Blog
ADD CONSTRAINT FK_Blog_Employees FOREIGN KEY (AuthorID)
REFERENCES Employees(EmployeeID);

-- Thêm cột cho trường hợp tác giả là khách hàng
ALTER TABLE Blog
ADD CONSTRAINT FK_Blog_Customers FOREIGN KEY (AuthorID)
REFERENCES Customers(CustomerID);

--Bảng Authors: Lưu thông tin tác giả.
--Bảng Books: Lưu thông tin sách, bao gồm tham chiếu đến AuthorID để liên kết với bảng tác giả.
--Bảng Customers: Lưu thông tin khách hàng, bao gồm mật khẩu đã mã hóa.
--Bảng Orders: Lưu thông tin đơn hàng và trạng thái đơn hàng.
--Bảng OrderDetails: Chi tiết từng đơn hàng, bao gồm số lượng và giá của từng cuốn sách.
--Bảng Payments: Quản lý giao dịch thanh toán của mỗi đơn hàng.
--Bảng Suppliers: Lưu thông tin nhà cung cấp.
--Bảng Employees: Lưu thông tin nhân viên quản lý hệ thống.
--Bảng BookReviews: Khách hàng có thể đánh giá và bình luận sách với thang điểm từ 1 đến 5.

--  Thêm dữ liệu vào bảng Authors (Tác giả):
INSERT INTO Authors (Name, Biography, Nationality)
VALUES 
('J.K. Rowling', 'Tác giả người Anh, nổi tiếng với bộ truyện Harry Potter', 'Anh'),
('George R.R. Martin', 'Tác giả của bộ truyện A Song of Ice and Fire', 'Mỹ'),
('Haruki Murakami', 'Tác giả Nhật Bản nổi tiếng với nhiều tiểu thuyết kỳ ảo', 'Nhật Bản'),
('Dan Brown', 'Tác giả của những cuốn sách trinh thám nổi tiếng như Mật mã Da Vinci', 'Mỹ'),
('Stephen King', 'Vua của dòng văn học kinh dị', 'Mỹ'),
('Nguyễn Nhật Ánh', 'Tác giả nổi tiếng của văn học thiếu nhi Việt Nam', 'Việt Nam'),
('Paulo Coelho', 'Tác giả cuốn sách Nhà giả kim nổi tiếng', 'Brazil'),
('J.R.R. Tolkien', 'Tác giả bộ truyện Chúa tể những chiếc nhẫn', 'Anh'),
('Khaled Hosseini', 'Tác giả cuốn sách Người đua diều', 'Afghanistan'),
('Margaret Atwood', 'Tác giả cuốn Chuyện người tùy nữ', 'Canada');

-- Thêm dữ liệu vào bảng Books (Sách):
INSERT INTO Books (Title, AuthorID, Genre, PublicationDate, Price, Description, StockQuantity, ImageURL, Publisher, ISBN)
VALUES 
('Harry Potter and the Philosopher''s Stone', 1, 'Fantasy', '1997-06-26', 15.99, 'Cuốn sách đầu tiên trong bộ truyện Harry Potter', 100, 'https://image-url.com/harry_potter_1.jpg', 'Bloomsbury', '9780747532699'),
('A Game of Thrones', 2, 'Fantasy', '1996-08-06', 19.99, 'Cuốn sách đầu tiên trong bộ truyện A Song of Ice and Fire', 50, 'https://image-url.com/game_of_thrones.jpg', 'Bantam Books', '9780553103540'),
('Norwegian Wood', 3, 'Literary Fiction', '1987-09-04', 12.99, 'Tiểu thuyết nổi tiếng của Haruki Murakami', 80, 'https://image-url.com/norwegian_wood.jpg', 'Kodansha', '9784061860251'),
('The Da Vinci Code', 4, 'Thriller', '2003-03-18', 14.99, 'Cuốn sách trinh thám nổi tiếng của Dan Brown', 90, 'https://image-url.com/da_vinci_code.jpg', 'Doubleday', '9780385504201'),
('The Shining', 5, 'Horror', '1977-01-28', 13.99, 'Một trong những cuốn sách kinh dị nổi tiếng nhất của Stephen King', 60, 'https://image-url.com/the_shining.jpg', 'Doubleday', '9780385121675'),
('Kính vạn hoa', 6, 'Thiếu nhi', '1995-08-01', 9.99, 'Bộ truyện thiếu nhi nổi tiếng tại Việt Nam', 120, 'https://image-url.com/kinh_van_hoa.jpg', 'Kim Đồng', '9786042074231'),
('The Alchemist', 7, 'Fable', '1988-04-15', 11.99, 'Cuốn sách Nhà giả kim của Paulo Coelho', 75, 'https://image-url.com/the_alchemist.jpg', 'HarperOne', '9780061122415'),
('The Hobbit', 8, 'Fantasy', '1937-09-21', 18.99, 'Cuốn tiểu thuyết phiêu lưu nổi tiếng của J.R.R. Tolkien', 70, 'https://image-url.com/the_hobbit.jpg', 'George Allen & Unwin', '9780048231887'),
('The Kite Runner', 9, 'Drama', '2003-05-29', 14.99, 'Tiểu thuyết Người đua diều của Khaled Hosseini', 85, 'https://image-url.com/kite_runner.jpg', 'Riverhead Books', '9781594631931'),
('The Handmaid''s Tale', 10, 'Dystopian', '1985-09-01', 16.99, 'Cuốn tiểu thuyết Chuyện người tùy nữ của Margaret Atwood', 65, 'https://image-url.com/handmaids_tale.jpg', 'McClelland & Stewart', '9780771008784');

-- Thêm dữ liệu cho 2 sách
INSERT INTO Books (Title, AuthorID, Genre, PublicationDate, Price, Description, StockQuantity, ImageURL, Publisher, ISBN, SupplierID)
VALUES 
('Nhà Giả Kim', 1, 'Tiểu Thuyết', '2019-03-15', 150000, 'Cuốn sách nổi tiếng về hành trình đi tìm kho báu của cậu bé chăn cừu.', 100, 'https://example.com/nha_gia_kim.jpg', 'NXB Trẻ', '9786041098017', 1),

('Tôi Thấy Hoa Vàng Trên Cỏ Xanh', 2, 'Văn Học', '2015-08-20', 120000, 'Câu chuyện về tuổi thơ đầy xúc động của những đứa trẻ làng quê.', 200, 'https://example.com/toi_thay_hoa_vang_tren_co_xanh.jpg', 'NXB Trẻ', '9786041097720', 2);


-- Thêm dữ liệu vào bảng Customers (Khách hàng):
INSERT INTO Customers (Name, Email, PhoneNumber, Address, PasswordHash)
VALUES 
('Nguyen Van A', 'nguyenvana@gmail.com', '0912345678', '123 Đường ABC, Quận 1, TP. HCM', 'hashedpassword1'),
('Tran Thi B', 'tranthib@gmail.com', '0987654321', '456 Đường DEF, Quận 3, TP. HCM', 'hashedpassword2'),
('Le Van C', 'levanc@gmail.com', '0901234567', '789 Đường GHI, Quận 7, TP. HCM', 'hashedpassword3'),
('Nguyen Thi D', 'nguyenthid@gmail.com', '0934567890', '12 Đường XYZ, Quận 10, TP. HCM', 'hashedpassword4'),
('Pham Van E', 'phamvane@gmail.com', '0976543210', '98 Đường LMN, Quận Bình Thạnh, TP. HCM', 'hashedpassword5'),
('Vo Thi F', 'vothif@gmail.com', '0945678912', '78 Đường PQR, Quận Thủ Đức, TP. HCM', 'hashedpassword6'),
('Nguyen Van G', 'nguyenvang@gmail.com', '0934561234', '34 Đường STU, Quận 2, TP. HCM', 'hashedpassword7'),
('Tran Van H', 'tranvanh@gmail.com', '0987654329', '90 Đường VWX, Quận 4, TP. HCM', 'hashedpassword8'),
('Nguyen Thi I', 'nguyenthii@gmail.com', '0912123456', '23 Đường YZA, Quận 6, TP. HCM', 'hashedpassword9'),
('Pham Van J', 'phamvanj@gmail.com', '0945671234', '56 Đường ABCD, Quận Tân Bình, TP. HCM', 'hashedpassword10');


-- Thêm dữ liệu vào bảng Orders (Đơn hàng):

INSERT INTO Orders (CustomerID, OrderDate, TotalPrice, OrderStatus, ShippingAddress, PaymentMethod)
VALUES 
(1, '2024-10-18', 35.98, 'Đang xử lý', '123 Đường ABC, Quận 1, TP. HCM', 'Thẻ tín dụng'),
(2, '2024-10-19', 19.99, 'Đã hoàn thành', '456 Đường DEF, Quận 3, TP. HCM', 'Ví điện tử'),
(3, '2024-10-20', 14.99, 'Đang xử lý', '789 Đường GHI, Quận 7, TP. HCM', 'Chuyển khoản ngân hàng'),
(4, '2024-10-21', 29.99, 'Đang xử lý', '12 Đường XYZ, Quận 10, TP. HCM', 'Ví điện tử'),
(5, '2024-10-22', 18.99, 'Đã hoàn thành', '98 Đường LMN, Quận Bình Thạnh, TP. HCM', 'Thẻ tín dụng'),
(6, '2024-10-23', 16.99, 'Đang xử lý', '78 Đường PQR, Quận Thủ Đức, TP. HCM', 'Chuyển khoản ngân hàng'),
(7, '2024-10-24', 12.99, 'Đã hoàn thành', '34 Đường STU, Quận 2, TP. HCM', 'Thẻ tín dụng'),
(8, '2024-10-25', 14.99, 'Đang xử lý', '90 Đường VWX, Quận 4, TP. HCM', 'Ví điện tử'),
(9, '2024-10-26', 9.99, 'Đã hoàn thành', '23 Đường YZA, Quận 6, TP. HCM', 'Ví điện tử'),
(10, '2024-10-27', 11.99, 'Đang xử lý', '56 Đường ABCD, Quận Tân Bình, TP. HCM', 'Chuyển khoản ngân hàng');


-- Thêm dữ liệu vào bảng OrderDetails (Chi tiết đơn hàng):

INSERT INTO OrderDetails (OrderID, BookID, Quantity, UnitPrice)
VALUES 
(1, 1, 2, 15.99),
(2, 2, 1, 19.99),
(3, 3, 1, 12.99),
(4, 4, 1, 14.99),
(5, 5, 1, 18.99),
(6, 6, 1, 16.99),
(7, 7, 1, 11.99),
(8, 8, 1, 14.99),
(9, 9, 1, 9.99),
(10, 10, 1, 11.99);


-- Thêm dữ liệu vào bảng Payments (Thanh toán):
INSERT INTO Payments (OrderID, PaymentDate, PaymentMethod, Amount)
VALUES 
(1, '2024-10-18', 'Thẻ tín dụng', 35.98),
(2, '2024-10-19', 'Ví điện tử', 19.99),
(3, '2024-10-20', 'Chuyển khoản ngân hàng', 14.99),
(4, '2024-10-21', 'Ví điện tử', 29.99),
(5, '2024-10-22', 'Thẻ tín dụng', 18.99),
(6, '2024-10-23', 'Chuyển khoản ngân hàng', 16.99),
(7, '2024-10-24', 'Thẻ tín dụng', 12.99),
(8, '2024-10-25', 'Ví điện tử', 14.99),
(9, '2024-10-26', 'Ví điện tử', 9.99),
(10, '2024-10-27', 'Chuyển khoản ngân hàng', 11.99);

-- Thêm dữ liệu vào bảng Suppliers (Nhà cung cấp):
INSERT INTO Suppliers (SupplierName, ContactInfo, Address, PhoneNumber)
VALUES 
('Nhà xuất bản Bloomsbury', 'contact@bloomsbury.com', '50 Bedford Square, London, UK', ' 800 9011'),
('Nhà xuất bản Bantam Books', 'info@bantambooks.com', '1745 Broadway, New York, USA', '+-782-9000'),
('Nhà xuất bản Kodansha', 'contact@kodansha.co.jp', '2-12-21 Otowa, Bunkyo-ku, Tokyo, Japan', '+3945-1111'),
('Nhà xuất bản Kim Đồng', 'nxbkimdong@vietnam.com', '55 Quang Trung, Hà Nội, Việt Nam', '3943 6442'),
('Nhà xuất bản Doubleday', 'info@doubleday.com', '1745 Broadway, New York, USA', '-782-9000'),
('Nhà xuất bản HarperOne', 'info@harperone.com', '195 Broadway, New York, USA', '+-207-7000'),
('Nhà xuất bản George Allen & Unwin', 'info@georgeallen.com', '40 Museum St, London, UK', '98 2022'),
('Nhà xuất bản Riverhead Books', 'contact@riverheadbooks.com', '375 Hudson St, New York, USA', '366-2000'),
('Nhà xuất bản McClelland & Stewart', 'info@mcclelland.com', '75 Sherbourne St, Toronto, Canada', '-1114'),
('Nhà xuất bản Hachette', 'contact@hachette.com', '1290 Avenue of the Americas, New York, USA', '-5151');


-- Thêm dữ liệu vào bảng Employees (Nhân viên):
INSERT INTO Employees (Name, Position, Salary, HireDate, Email, PhoneNumber)
VALUES 
('Nguyen Thi Thu', 'Quản lý kho', 15000000, '2022-01-01', 'thuthu@company.com', '0912345678'),
('Le Van Phuc', 'Quản lý bán hàng', 18000000, '2021-03-15', 'phucle@company.com', '0901234567'),
('Tran Thi Mai', 'Nhân viên chăm sóc khách hàng', 12000000, '2023-07-01', 'maitran@company.com', '0976543210'),
('Nguyen Van Hoa', 'Nhân viên giao hàng', 10000000, '2022-05-20', 'hoanguyen@company.com', '0934567890'),
('Pham Thi Lan', 'Kế toán', 16000000, '2021-11-01', 'lanpham@company.com', '0945678912'),
('Vo Van Tuan', 'Nhân viên kỹ thuật', 14000000, '2020-09-10', 'tuanvo@company.com', '0934561234'),
('Nguyen Thi Minh', 'Nhân viên bán hàng', 13000000, '2023-02-18', 'minhnguyen@company.com', '0987654329'),
('Tran Van Hieu', 'Nhân viên giao hàng', 10000000, '2022-10-10', 'hieutran@company.com', '0912123456'),
('Le Thi Hoa', 'Quản lý dịch vụ khách hàng', 17000000, '2020-12-15', 'hoale@company.com', '0945671234'),
('Nguyen Van Khoa', 'Giám đốc', 30000000, '2019-01-01', 'khoanguyen@company.com', '0909998888');


-- Thêm 10 dữ liệu vào bảng Blog
INSERT INTO Blog (Title, Content, AuthorID, AuthorType, PublishedDate, Status, Tags, ImageURL)
VALUES 
('Exploring the World of Fiction', 'An in-depth look at modern fiction and its impact on readers.', 1, 'Employee', '2024-10-01', 'Published', 'Fiction, Books, Review', 'blog1.jpg'),
('The Evolution of Book Publishing', 'How the book publishing industry has transformed over the years.', 2, 'Employee', '2024-10-05', 'Published', 'Publishing, History, Books', 'blog2.jpg'),
('5 Must-Read Fantasy Novels', 'A list of top 5 fantasy novels everyone should read.', 3, 'Customer', '2024-09-15', 'Published', 'Fantasy, Books, Recommendations', 'blog3.jpg'),
('A Beginner’s Guide to Reading Classics', 'An introduction to classic literature and why it’s worth your time.', 4, 'Employee', '2024-09-20', 'Published', 'Classics, Books, Guide', 'post-item4.jpg'),
('The Impact of Digital Books', 'Discussing the rise of digital books and their effects on traditional reading habits.', 5, 'Customer', '2024-08-30', 'Published', 'E-books, Technology, Reading', 'post-item5.jpg'),
('How to Organize Your Bookshelf', 'Practical tips for keeping your bookshelf organized and tidy.', 1, 'Employee', '2024-09-10', 'Draft', 'Organization, Bookshelf, Tips', 'post-item6.jpg'),
('The Future of Independent Bookstores', 'What the future holds for independent bookstores in a digital world.', 2, 'Employee', '2024-09-25', 'Published', 'Bookstores, Future, Independent', 'post-item4.jpg'),
('Top 10 Mystery Novels of the Decade', 'A countdown of the best mystery novels from the past decade.', 3, 'Customer', '2024-10-02', 'Published', 'Mystery, Books, Recommendations', 'post-item1.jpg'),
('Reading for Mental Health', 'How reading can positively affect mental health and well-being.', 4, 'Customer', '2024-09-18', 'Published', 'Mental Health, Reading, Well-being', 'blog2.jpg')


INSERT INTO BookReviews (BookID, CustomerID, ReviewContent, Rating, ReviewDate)
VALUES
(1, 1, 'Rất hay! Tôi đã đọc đi đọc lại nhiều lần.', 5, '2024-01-15'),
(2, 2, 'Cốt truyện hấp dẫn và lôi cuốn từ đầu đến cuối.', 4, '2024-02-20'),
(3, 3, 'Phong cách viết đặc biệt nhưng hơi khó đọc.', 3, '2024-03-10'),
(4, 4, 'Sách rất thú vị, nhưng kết thúc không như mong đợi.', 4, '2024-04-05'),
(5, 5, 'Thật sự sợ hãi khi đọc cuốn sách này vào ban đêm!', 5, '2024-05-12'),
(6, 6, 'Sách dành cho thiếu nhi nhưng người lớn cũng có thể thích.', 4, '2024-06-01'),
(7, 7, 'Cuốn sách có ý nghĩa sâu sắc và truyền cảm hứng.', 5, '2024-07-14'),
(8, 8, 'Một tác phẩm kinh điển. Không thể bỏ qua!', 5, '2024-08-21'),
(9, 9, 'Cuốn sách này thực sự thay đổi cách nhìn của tôi về cuộc sống.', 5, '2024-09-08'),
(10, 10, 'Câu chuyện quá phức tạp và khó theo dõi.', 2, '2024-10-01'),
(1, 10, 'Tôi rất yêu thích thế giới phép thuật trong cuốn sách này.', 5, '2024-10-10'),
(2, 9, 'Nhân vật được xây dựng rất sâu sắc.', 4, '2024-10-12'),
(3, 8, 'Một cuốn sách đầy cảm xúc và suy ngẫm.', 5, '2024-10-13'),
(4, 7, 'Cuốn sách khiến tôi không thể rời mắt.', 5, '2024-10-14'),
(5, 6, 'Nội dung quá khủng khiếp, không hợp với tôi.', 1, '2024-10-15'),
(6, 5, 'Truyện rất phù hợp cho trẻ em, dễ đọc và vui nhộn.', 4, '2024-10-16'),
(7, 4, 'Câu chuyện rất đẹp, nhiều bài học quý giá.', 5, '2024-10-17'),
(8, 3, 'Đây là một trong những cuốn sách hay nhất tôi từng đọc.', 5, '2024-10-18'),
(9, 2, 'Cuốn sách làm tôi khóc rất nhiều.', 5, '2024-10-19'),
(10,1, 'Không phải gu của tôi, nhưng cũng ổn.', 3, '2024-10-20');
