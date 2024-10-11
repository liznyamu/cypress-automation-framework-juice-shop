class Page{
    open(path){
        cy.visit(`/${path}`);
    }
}

export default Page;  