package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.DTO.OrderDetailDTO;
import com.Sever.Sever.Mapper.OrderDetailMapper;
import com.Sever.Sever.Model.OrderDetail;
import com.Sever.Sever.Resp.OrderDetailRepository;
import com.Sever.Sever.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public List<OrderDetailDTO> getAllOrderDetailsbyOrderid(int orderid) {
        List<OrderDetail> orderDetails = orderDetailRepository.findOrderDetailByOrder_OrderID(orderid);

        return orderDetails.stream()
                .map(OrderDetailMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<OrderDetail> getOrderDetailById(int id) {
        return orderDetailRepository.findById(id);
    }

    @Override
    public OrderDetail createOrderDetail(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail updateOrderDetail(int id, OrderDetail updatedOrderDetail) {
        return orderDetailRepository.findById(id)
                .map(orderDetail -> {
                    orderDetail.setQuantity(updatedOrderDetail.getQuantity());
                    orderDetail.setUnitprice(updatedOrderDetail.getUnitprice());
                    return orderDetailRepository.save(orderDetail);
                }).orElseThrow(() -> new RuntimeException("OrderDetail not found"));
    }

    @Override
    public void deleteOrderDetail(int id) {
        orderDetailRepository.deleteById(id);
    }
}
