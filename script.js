const grabCompanies = () => new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/companies')
            .then(response => response.json())
            .then(jsonData => res(jsonData))
            .catch(e => rej(e));
})

const grabProducts = () => new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/products')
            .then(response => response.json())
            .then(jsonData => res(jsonData))
            .catch(e => rej(e));
})

const grabOfferings = () => new Promise((res, rej) => {
    // can change url to /api/products, /api/offerings for the other ones
    return window.fetch('https://acme-users-api-rev.herokuapp.com/api/offerings')
            .then(response => response.json())
            .then(jsonData => res(jsonData))
            .catch(e => rej(e));
})

Promise.all([grabCompanies(), grabOfferings(), grabProducts()]).then(response => {
    const [companies, offerings, products] = response;

    const productsInPriceRange = findProductsInPriceRange(products, { min: 1, max: 15});
    console.log(productsInPriceRange);

    const groupedCompaniesByLetter = groupCompaniesByLetter(companies);
    console.log(groupedCompaniesByLetter);

    const groupedCompnaiesByState = groupCompaniesByState(companies);
    console.log(groupedCompnaiesByState);

    const processedOfferings = processOfferings({ companies, products, offerings});
    console.log(processedOfferings);

    const threeOrMoreOfferings = companiesByNumberOfOfferings(companies, offerings, 3);
    console.log(threeOrMoreOfferings);

    const processedProducts = processProducts({products, offerings});
    console.log(processedProducts);
})


const findProductsInPriceRange = (products, ranges) => {
    return products.filter(product => product.suggestedPrice <= ranges.max && product.suggestedPrice >= ranges.min);
}

grabProducts().then(products => {
    const productsInPriceRange = findProductsInPriceRange(products, { min: 1, max: 15});
    console.log(productsInPriceRange);
});

const groupCompaniesByLetter = companies =>{
    const groupedCompanies = {};

    companies.forEach(company => {
        const companyFL = company.name[0];
        if(companyFL in groupedCompanies){
            groupedCompanies[companyFL] = groupedCompanies[companyFL]. concat([company])
        }else{
            groupedCompanies[companyFL] = [company];
        }
    });

    return groupedCompanies;
};

grabCompanies().then(companies => {
    const groupedCompaniesByLetter = groupCompaniesByLetter(companies);
    console.log(groupedCompaniesByLetter);
});

const groupCompaniesByState = companies => {
    const groupedCompanies = {};

    companies.forEach(company => {
        const companyState = company.state;
        if(companyState in groupedCompanies){
            groupedCompanies[companyState] = groupedCompanies[companyState]. concat([company])
        }else{
            groupedCompanies[companyState] = [company];
        }
    });

    return groupedCompanies;
};

grabCompanies().then(companies => {
    const groupedCompnaiesByState = groupCompaniesByState(companies);
    console.log(groupedCompnaiesByState);
});

const processOfferings = (companies, products, offerings) => {

}