package com.Sever.Sever.Service;


import com.Sever.Sever.Model.Supplier;

import java.util.List;
import java.util.Optional;

public interface SupplierService {
    List<Supplier> getAllSuppliers();
    Optional<Supplier> getSupplierById(int id);
    Supplier createSupplier(Supplier supplier);
    Supplier updateSupplier(int id, Supplier supplier);
    void deleteSupplier(int id);
}
