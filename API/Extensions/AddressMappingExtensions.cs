﻿using API.DTO;
using Core.Entities.Users;

namespace API.Extensions;

public static class AddressMappingExtensions
{
    public static AddressDto? ToDto(this Address? address)
    {
        if (address == null)
        {
            return null;
        }

        return new AddressDto()
        {
            Line1 = address.Line1,
            Line2 = address.Line2,
            City = address.City,
            State = address.State,
            Country = address.Country,
            Postcode = address.Postcode
        };
    }

    public static Address ToEntity(this AddressDto addressDto)
    {
        ArgumentNullException.ThrowIfNull(addressDto);

        return new Address()
        {
            Line1 = addressDto.Line1,
            Line2 = addressDto.Line2,
            City = addressDto.City,
            State = addressDto.State,
            Country = addressDto.Country,
            Postcode = addressDto.Postcode
        };
    }

    public static void UpdateFromDto(this Address address, AddressDto addressDto)
    {
        ArgumentNullException.ThrowIfNull(address);
        ArgumentNullException.ThrowIfNull(addressDto);
        
        address.Line1 = addressDto.Line1;
        address.Line2 = addressDto.Line2;
        address.City = addressDto.City;
        address.State = addressDto.State;
        address.Country = addressDto.Country;
        address.Postcode = addressDto.Postcode;
    }
}