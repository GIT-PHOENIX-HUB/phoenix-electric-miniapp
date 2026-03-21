/* =============================================
   REXEL PRODUCT CATALOG — Mock Data
   50+ representative products across 8 categories
   ============================================= */

var RexelCatalog = (function () {
  'use strict';

  var CATEGORIES = [
    { id: 'wire-cable', name: 'Wire & Cable', icon: 'wire' },
    { id: 'conduit-fittings', name: 'Conduit & Fittings', icon: 'conduit' },
    { id: 'breakers-panels', name: 'Breakers & Panels', icon: 'panel' },
    { id: 'lighting', name: 'Lighting', icon: 'lightbulb' },
    { id: 'tools', name: 'Tools', icon: 'wrench' },
    { id: 'safety', name: 'Safety', icon: 'safety' },
    { id: 'ev-charging', name: 'EV Charging', icon: 'evCharger' },
    { id: 'generators', name: 'Generators', icon: 'generator' },
  ];

  var BRANDS = [
    'Southwire', 'Encore Wire', 'Allied Tube', 'Square D', 'Eaton',
    'Siemens', 'Leviton', 'Hubbell', 'Greenlee', 'Klein Tools',
    'Milwaukee', 'Generac', 'ChargePoint', 'JuiceBox', 'Acuity',
    'Lithonia', 'RAB Lighting', '3M', 'Ideal', 'Thomas & Betts'
  ];

  var PRODUCTS = [
    // Wire & Cable (8 products)
    { sku: 'RXL-WC-001', name: '12/2 NM-B Romex 250ft', category: 'wire-cable', brand: 'Southwire', price: 89.97, unit: 'roll', description: '12 AWG, 2-conductor with ground, NM-B rated residential wiring. 250ft coil.', inStock: true },
    { sku: 'RXL-WC-002', name: '14/2 NM-B Romex 250ft', category: 'wire-cable', brand: 'Southwire', price: 62.47, unit: 'roll', description: '14 AWG, 2-conductor with ground, NM-B rated for 15A circuits. 250ft coil.', inStock: true },
    { sku: 'RXL-WC-003', name: '10/3 NM-B Romex 125ft', category: 'wire-cable', brand: 'Southwire', price: 119.99, unit: 'roll', description: '10 AWG, 3-conductor with ground for dryers, A/C. 125ft coil.', inStock: true },
    { sku: 'RXL-WC-004', name: '6/3 NM-B Romex 75ft', category: 'wire-cable', brand: 'Southwire', price: 189.97, unit: 'roll', description: '6 AWG, 3-conductor with ground for ranges, sub-panels. 75ft coil.', inStock: false },
    { sku: 'RXL-WC-005', name: 'THHN 10 AWG Black 500ft', category: 'wire-cable', brand: 'Encore Wire', price: 142.50, unit: 'spool', description: '10 AWG solid THHN/THWN-2, black, 500ft spool. For conduit runs.', inStock: true },
    { sku: 'RXL-WC-006', name: 'THHN 12 AWG Green 500ft', category: 'wire-cable', brand: 'Encore Wire', price: 94.75, unit: 'spool', description: '12 AWG solid THHN/THWN-2, green ground wire, 500ft spool.', inStock: true },
    { sku: 'RXL-WC-007', name: '2/0 Aluminum SER 150ft', category: 'wire-cable', brand: 'Southwire', price: 345.00, unit: 'roll', description: '2/0-2/0-1-4 aluminum SER cable for 200A service entrance. 150ft.', inStock: true },
    { sku: 'RXL-WC-008', name: 'MC Cable 12/2 250ft', category: 'wire-cable', brand: 'Southwire', price: 175.49, unit: 'roll', description: '12/2 metal-clad cable with ground, commercial grade. 250ft coil.', inStock: true },

    // Conduit & Fittings (7 products)
    { sku: 'RXL-CF-001', name: 'EMT Conduit 3/4" x 10ft', category: 'conduit-fittings', brand: 'Allied Tube', price: 8.97, unit: 'stick', description: '3/4 inch EMT (electrical metallic tubing), 10-foot stick.', inStock: true },
    { sku: 'RXL-CF-002', name: 'EMT Conduit 1" x 10ft', category: 'conduit-fittings', brand: 'Allied Tube', price: 12.49, unit: 'stick', description: '1 inch EMT conduit, 10-foot stick. For larger wire runs.', inStock: true },
    { sku: 'RXL-CF-003', name: 'PVC Conduit 3/4" x 10ft Sch40', category: 'conduit-fittings', brand: 'Allied Tube', price: 4.29, unit: 'stick', description: '3/4 inch Schedule 40 PVC conduit, 10-foot stick. UV rated.', inStock: true },
    { sku: 'RXL-CF-004', name: 'EMT Compression Connector 3/4"', category: 'conduit-fittings', brand: 'Thomas & Betts', price: 2.19, unit: 'each', description: '3/4 inch EMT compression connector, steel. UL listed.', inStock: true },
    { sku: 'RXL-CF-005', name: 'EMT Compression Coupling 3/4"', category: 'conduit-fittings', brand: 'Thomas & Betts', price: 2.49, unit: 'each', description: '3/4 inch EMT compression coupling, steel. Joins two conduit sticks.', inStock: true },
    { sku: 'RXL-CF-006', name: 'LB Conduit Body 3/4" PVC', category: 'conduit-fittings', brand: 'Thomas & Betts', price: 6.79, unit: 'each', description: '3/4 inch PVC type LB conduit body with cover and gasket.', inStock: true },
    { sku: 'RXL-CF-007', name: 'Liquid-Tight Flex 3/4" x 25ft', category: 'conduit-fittings', brand: 'Allied Tube', price: 42.99, unit: 'roll', description: '3/4 inch liquid-tight flexible metallic conduit, 25ft coil.', inStock: true },

    // Breakers & Panels (8 products)
    { sku: 'RXL-BP-001', name: 'Square D QO 200A Main Breaker Panel', category: 'breakers-panels', brand: 'Square D', price: 289.00, unit: 'each', description: '200A main breaker load center, 42-space, 84-circuit. Indoor.', inStock: true },
    { sku: 'RXL-BP-002', name: 'Square D QO 20A Single-Pole Breaker', category: 'breakers-panels', brand: 'Square D', price: 8.97, unit: 'each', description: 'QO120 20-amp single-pole plug-on circuit breaker.', inStock: true },
    { sku: 'RXL-BP-003', name: 'Square D QO 20A AFCI Breaker', category: 'breakers-panels', brand: 'Square D', price: 42.97, unit: 'each', description: 'QO120AFCI 20A arc-fault circuit interrupter. Required NEC 210.12.', inStock: true },
    { sku: 'RXL-BP-004', name: 'Square D QO 20A GFCI Breaker', category: 'breakers-panels', brand: 'Square D', price: 39.97, unit: 'each', description: 'QO120GFI 20A ground-fault circuit interrupter breaker.', inStock: true },
    { sku: 'RXL-BP-005', name: 'Eaton BR 200A Main Panel', category: 'breakers-panels', brand: 'Eaton', price: 249.00, unit: 'each', description: 'BR4040B200 200A main breaker panel, 40-space, 40-circuit.', inStock: true },
    { sku: 'RXL-BP-006', name: 'Square D QO 50A 2-Pole Breaker', category: 'breakers-panels', brand: 'Square D', price: 18.97, unit: 'each', description: 'QO250 50-amp 2-pole breaker for ranges, sub-panels.', inStock: true },
    { sku: 'RXL-BP-007', name: 'Square D QO 30A 2-Pole Breaker', category: 'breakers-panels', brand: 'Square D', price: 14.97, unit: 'each', description: 'QO230 30-amp 2-pole breaker for dryers, water heaters.', inStock: true },
    { sku: 'RXL-BP-008', name: 'Siemens 200A Meter Main Combo', category: 'breakers-panels', brand: 'Siemens', price: 549.00, unit: 'each', description: 'MC2040B1200 200A meter/main combo panel. Outdoor rated.', inStock: false },

    // Lighting (7 products)
    { sku: 'RXL-LT-001', name: 'Lithonia 4ft LED Wraparound 40W', category: 'lighting', brand: 'Lithonia', price: 39.97, unit: 'each', description: '4-foot LED wraparound fixture, 40W, 4000K, 4400 lumens. Surface mount.', inStock: true },
    { sku: 'RXL-LT-002', name: 'RAB LED Flood 50W Bronze', category: 'lighting', brand: 'RAB Lighting', price: 89.97, unit: 'each', description: 'FFLED50 50W LED floodlight, 5000K, bronze finish. DLC listed.', inStock: true },
    { sku: 'RXL-LT-003', name: 'Lithonia 6" LED Downlight Retrofit', category: 'lighting', brand: 'Lithonia', price: 18.97, unit: 'each', description: '6-inch LED retrofit downlight, 12W, 3000K, dimmable. IC rated.', inStock: true },
    { sku: 'RXL-LT-004', name: 'RAB LED Wall Pack 26W', category: 'lighting', brand: 'RAB Lighting', price: 119.00, unit: 'each', description: 'WPLED26 26W LED wall pack, 5000K, photocell included. Commercial.', inStock: true },
    { sku: 'RXL-LT-005', name: 'Acuity LED High Bay 150W', category: 'lighting', brand: 'Acuity', price: 249.00, unit: 'each', description: '150W LED high bay fixture, 5000K, 20,000 lumens. Chain mount.', inStock: true },
    { sku: 'RXL-LT-006', name: 'Leviton Decora Dimmer LED/CFL', category: 'lighting', brand: 'Leviton', price: 24.97, unit: 'each', description: 'DSL06 Decora universal LED/CFL dimmer, 300W. Slide control.', inStock: true },
    { sku: 'RXL-LT-007', name: 'LED Emergency Combo Exit Sign', category: 'lighting', brand: 'Lithonia', price: 54.97, unit: 'each', description: 'LED exit sign with emergency lights, red letters, battery backup.', inStock: true },

    // Tools (6 products)
    { sku: 'RXL-TL-001', name: 'Klein 11-in-1 Screwdriver', category: 'tools', brand: 'Klein Tools', price: 24.97, unit: 'each', description: '11-in-1 multi-bit screwdriver/nut driver. Cushion grip.', inStock: true },
    { sku: 'RXL-TL-002', name: 'Klein Wire Stripper 10-18 AWG', category: 'tools', brand: 'Klein Tools', price: 32.97, unit: 'each', description: 'Klein K1412 wire stripper/cutter for 10-18 AWG solid and stranded.', inStock: true },
    { sku: 'RXL-TL-003', name: 'Greenlee Slug-Buster Knockout Set', category: 'tools', brand: 'Greenlee', price: 189.00, unit: 'set', description: '1/2 through 2 inch knockout punch set with case.', inStock: true },
    { sku: 'RXL-TL-004', name: 'Milwaukee M12 Copper Tubing Cutter', category: 'tools', brand: 'Milwaukee', price: 149.00, unit: 'each', description: 'M12 cordless copper tubing cutter kit with battery and charger.', inStock: false },
    { sku: 'RXL-TL-005', name: 'Ideal Voltage Tester Non-Contact', category: 'tools', brand: 'Ideal', price: 22.97, unit: 'each', description: 'Vol-Con non-contact voltage tester, 50-1000VAC. LED and buzzer.', inStock: true },
    { sku: 'RXL-TL-006', name: 'Klein Digital Clamp Meter CL800', category: 'tools', brand: 'Klein Tools', price: 119.97, unit: 'each', description: 'CL800 digital clamp meter, 600A AC/DC, True RMS, auto-ranging.', inStock: true },

    // Safety (6 products)
    { sku: 'RXL-SF-001', name: '3M Hard Hat White Vented', category: 'safety', brand: '3M', price: 29.97, unit: 'each', description: 'SecureFit H-701SFV-UV vented hard hat, white, UV indicator.', inStock: true },
    { sku: 'RXL-SF-002', name: 'Klein Insulated Gloves Class 0', category: 'safety', brand: 'Klein Tools', price: 89.97, unit: 'pair', description: 'Class 0 electrical insulating gloves, 1000VAC rated. ASTM D120.', inStock: true },
    { sku: 'RXL-SF-003', name: 'Arc Flash Face Shield Kit', category: 'safety', brand: '3M', price: 74.97, unit: 'each', description: 'Arc-rated face shield with hard hat adapter, 12 cal/cm2.', inStock: true },
    { sku: 'RXL-SF-004', name: 'Safety Glasses Clear Anti-Fog', category: 'safety', brand: '3M', price: 9.97, unit: 'pair', description: 'SecureFit safety glasses, clear anti-fog lens, ANSI Z87.1.', inStock: true },
    { sku: 'RXL-SF-005', name: 'Lockout/Tagout Kit Electrical', category: 'safety', brand: 'Ideal', price: 54.97, unit: 'kit', description: 'Electrical lockout/tagout kit with padlocks, hasps, and tags. OSHA compliant.', inStock: true },
    { sku: 'RXL-SF-006', name: 'Voltage Rated Work Boots', category: 'safety', brand: 'Klein Tools', price: 149.97, unit: 'pair', description: 'EH-rated work boots, composite toe, waterproof. ASTM F2413.', inStock: true },

    // EV Charging (5 products)
    { sku: 'RXL-EV-001', name: 'ChargePoint Home Flex 50A', category: 'ev-charging', brand: 'ChargePoint', price: 699.00, unit: 'each', description: 'Level 2 EV charger, 50A, NEMA 14-50 or hardwire. WiFi enabled.', inStock: true },
    { sku: 'RXL-EV-002', name: 'JuiceBox 48A Smart EVSE', category: 'ev-charging', brand: 'JuiceBox', price: 599.00, unit: 'each', description: 'Level 2 smart EV charger, 48A, WiFi, app control, NEMA 14-50.', inStock: true },
    { sku: 'RXL-EV-003', name: 'NEMA 14-50 Receptacle', category: 'ev-charging', brand: 'Hubbell', price: 18.97, unit: 'each', description: 'Heavy-duty NEMA 14-50R receptacle for EV chargers and ranges.', inStock: true },
    { sku: 'RXL-EV-004', name: '6/3 NM-B Cable for EV 50ft', category: 'ev-charging', brand: 'Southwire', price: 139.97, unit: 'roll', description: '6/3 NM-B with ground for 50A EV circuits. 50ft.', inStock: true },
    { sku: 'RXL-EV-005', name: 'ChargePoint Commercial CT4000', category: 'ev-charging', brand: 'ChargePoint', price: 6500.00, unit: 'each', description: 'Commercial dual-port Level 2 station, 7.7kW per port, networked.', inStock: false },

    // Generators (5 products)
    { sku: 'RXL-GN-001', name: 'Generac Guardian 22kW', category: 'generators', brand: 'Generac', price: 5800.00, unit: 'each', description: '22kW air-cooled standby generator with 200A SE transfer switch.', inStock: true },
    { sku: 'RXL-GN-002', name: 'Generac Guardian 14kW', category: 'generators', brand: 'Generac', price: 4100.00, unit: 'each', description: '14kW air-cooled standby generator with 100A 16-circuit switch.', inStock: true },
    { sku: 'RXL-GN-003', name: 'Generac 200A Transfer Switch', category: 'generators', brand: 'Generac', price: 1200.00, unit: 'each', description: 'RXSW200A3 200A SE-rated automatic transfer switch.', inStock: true },
    { sku: 'RXL-GN-004', name: 'Generac Generator Pad', category: 'generators', brand: 'Generac', price: 289.00, unit: 'each', description: 'GenPad composite generator pad, 36x48 inches.', inStock: true },
    { sku: 'RXL-GN-005', name: 'Generac Mobile Link WiFi Module', category: 'generators', brand: 'Generac', price: 179.00, unit: 'each', description: 'WiFi monitoring module for Generac standby generators.', inStock: true },
  ];

  function getCategories() {
    return CATEGORIES.slice();
  }

  function getBrands() {
    return BRANDS.slice();
  }

  function getAllProducts() {
    return PRODUCTS.slice();
  }

  function getProductsByCategory(categoryId) {
    return PRODUCTS.filter(function (p) { return p.category === categoryId; });
  }

  function searchProducts(query) {
    var q = (query || '').toLowerCase();
    if (!q) return PRODUCTS.slice();
    return PRODUCTS.filter(function (p) {
      return p.name.toLowerCase().indexOf(q) !== -1 ||
        p.sku.toLowerCase().indexOf(q) !== -1 ||
        p.description.toLowerCase().indexOf(q) !== -1 ||
        p.brand.toLowerCase().indexOf(q) !== -1;
    });
  }

  function filterProducts(opts) {
    var results = PRODUCTS.slice();
    if (opts.category) {
      results = results.filter(function (p) { return p.category === opts.category; });
    }
    if (opts.brand) {
      results = results.filter(function (p) { return p.brand === opts.brand; });
    }
    if (opts.minPrice !== undefined) {
      results = results.filter(function (p) { return p.price >= opts.minPrice; });
    }
    if (opts.maxPrice !== undefined) {
      results = results.filter(function (p) { return p.price <= opts.maxPrice; });
    }
    if (opts.inStock) {
      results = results.filter(function (p) { return p.inStock; });
    }
    if (opts.query) {
      var q = opts.query.toLowerCase();
      results = results.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) !== -1 ||
          p.sku.toLowerCase().indexOf(q) !== -1 ||
          p.description.toLowerCase().indexOf(q) !== -1;
      });
    }
    return results;
  }

  function getProductBySku(sku) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].sku === sku) return PRODUCTS[i];
    }
    return null;
  }

  return {
    CATEGORIES: CATEGORIES,
    BRANDS: BRANDS,
    PRODUCTS: PRODUCTS,
    getCategories: getCategories,
    getBrands: getBrands,
    getAllProducts: getAllProducts,
    getProductsByCategory: getProductsByCategory,
    searchProducts: searchProducts,
    filterProducts: filterProducts,
    getProductBySku: getProductBySku,
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RexelCatalog;
}
