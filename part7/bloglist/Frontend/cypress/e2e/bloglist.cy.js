describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "mluukkai",
      username: "mluukkai",
      password: "salainen",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);

    const user2 = {
      name: "mluukkai2",
      username: "mluukkai2",
      password: "salainen2",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);

    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });
  it("login form can be opened", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("salainen");
    cy.get("#login-button").click();
    cy.get("html").should("contain", "mluukkai logged in");
  });

  it("login fails with wrong credentials", function () {
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("wrong username or password");
    cy.get(".error")
      .should("contain", "wrong username or password")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "mluukkai logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });
    it("a new blog can be created", function () {
      cy.contains("Create new blog").click();
      cy.get("#title").type("test title");

      cy.get("#author").type("cypress");

      cy.get("#url").type("cypress url");
      cy.contains("create").click();
      cy.get(".add")
        .should("contain", "a new blog test title by cypress added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });
    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "test title",
          author: "cypress",
          url: "cypress url",
        });
      });
      it("it can be viewed", function () {
        cy.contains("test title cypress");
        cy.contains("view").click();

        cy.contains("test title cypress");
        cy.contains("hide").click();
      });
      it("blog can be liked", function () {
        cy.contains("test title cypress");
        cy.contains("view").click();
        cy.contains("Like").click();
        cy.contains("Likes:").should("contain", "1");
      });
      it("blog can be removed", function () {
        cy.contains("test title cypress");
        cy.contains("view").click();
        cy.contains("Remove").click();

        cy.get(".delete")
          .should(
            "contain",
            "Blog",
            "test title by cypress",
            "has been removed",
          )
          .and("have.css", "color", "rgb(255, 0, 0)")
          .and("have.css", "border-style", "solid");
        cy.get("html").should("not.contain", "test title cypress");
      });
    });

    describe("Blog ownership", function () {
      beforeEach(function () {
        cy.login({ username: "mluukkai", password: "salainen" });
        cy.createBlog({
          title: "test title",
          author: "cypress",
          url: "cypress url",
        });

        cy.login({ username: "mluukkai2", password: "salainen2" });
        cy.createBlog({
          title: "test title2",
          author: "cypress2",
          url: "cypress url2",
        });
      });

      it("try to remove blog as different user", function () {
        cy.contains("test title cypress");
        cy.contains("view").click();
        cy.contains("test title cypress").should("not.contain", "Remove");

        cy.login({ username: "mluukkai", password: "salainen" });

        cy.contains("test title2 cypress2");
        cy.contains("view").click();
        cy.contains("test title2 cypress2").should("not.contain", "Remove");
      });
    });

    it.only("blogs are arranged by likes", function () {
      cy.login({ username: "mluukkai", password: "salainen" });
      cy.createBlog({
        title: "Blog number 1",
        author: "cypress",
        url: "cypress url",
      });
      cy.createBlog({
        title: "Blog number 2",
        author: "cypress",
        url: "cypress url",
      });
      cy.createBlog({
        title: "Blog number 3",
        author: "cypress",
        url: "cypress url",
      });

      cy.contains("Blog number 1 cypress");
      cy.contains("view").click();
      cy.contains("Like").click().click();
      cy.contains("hide").click();

      cy.get(".blog")
        .eq(1)
        .within(() => {
          cy.contains("view").click();
          cy.contains("Like").click().click().click().click();
        });

      cy.get(".blog")
        .eq(2)
        .within(() => {
          cy.contains("view").click();
          cy.contains("Like").click().click().click();
        });

      cy.get(".blog").eq(0).should("contain", "Blog number 2");
      cy.get(".blog").eq(1).should("contain", "Blog number 3");
      cy.get(".blog").eq(2).should("contain", "Blog number 1");
    });
  });
});
