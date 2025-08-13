"""
Car manufacturer names and configurations for automotive parts database.

This module contains the list of supported car manufacturers for the 
automotive parts import system.
"""

# Top 30 manufacturers from database analysis
# Currently configured for testing with TOYOTA only
# Switch the comments below to enable full manufacturer list

# Test configuration (single manufacturer)
MANUFACTURERS = ["TOYOTA"]

# Full manufacturer list (uncomment to enable all manufacturers)
# MANUFACTURERS = [
#     "FIAT/ALFA/LANCIA", "MERCEDES-BENZ", "FORD", "VAG", "HONDA", 
#     "NISSAN", "MITSUBISHI", "HYUNDAI/KIA", "BMW", "RENAULT",
#     "TOYOTA", "PEUGEOT/CITROEN", "MAZDA", "GENERAL MOTORS", "MAN",
#     "SUBARU", "PORSCHE", "SUZUKI", "CHRYSLER", "LAND ROVER",
#     "JAGUAR", "IVECO", "PARTS UNLIMITED", "ARCTIC CAT", "KAWASAKI",
#     "POLARIS", "ISUZU", "BOSCH", "KTM", "FEBI"
# ]

def get_manufacturers():
    """
    Get the list of supported manufacturers.
    
    Returns:
        list: List of manufacturer names as strings
    """
    return MANUFACTURERS

def is_supported_manufacturer(manufacturer_name):
    """
    Check if a manufacturer is in the supported list.
    
    Args:
        manufacturer_name (str): Name of the manufacturer to check
        
    Returns:
        bool: True if manufacturer is supported, False otherwise
    """
    if not manufacturer_name:
        return False
    
    # Case-insensitive comparison
    manufacturer_upper = manufacturer_name.upper().strip()
    return any(make.upper() == manufacturer_upper for make in MANUFACTURERS)

def get_manufacturer_count():
    """
    Get the total number of supported manufacturers.
    
    Returns:
        int: Number of supported manufacturers
    """
    return len(MANUFACTURERS)