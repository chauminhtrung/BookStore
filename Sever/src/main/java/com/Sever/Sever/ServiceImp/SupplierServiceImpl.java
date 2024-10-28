package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Supplier;
import com.Sever.Sever.Resp.SupplierRepository;
import com.Sever.Sever.Service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    SupplierRepository supplierRepository;

    @Override
    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    @Override
    public Optional<Supplier> getSupplierById(int id) {
        return supplierRepository.findById(id);
    }

    @Override
    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    @Override
    public Supplier updateSupplier(int id, Supplier supplier) {
        return supplierRepository.findById(id)
                .map(supplierM -> {
                    supplier.setSuppliername(supplierM.getSuppliername());
                    supplier.setAddress(supplierM.getAddress());
                    supplier.setContactinfo(supplierM.getContactinfo());
                    supplier.setPhonenumber(supplierM.getPhonenumber());
                    return supplierRepository.save(supplierM);
                }).orElseThrow(() -> new RuntimeException("Author not found"));
    }

    @Override
    public void deleteSupplier(int id) {
        supplierRepository.deleteById(id);
    }
}
