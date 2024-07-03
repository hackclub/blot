# How to order Blot kits

Blot kits are provided by [ISource-Asia](http://www.isource-asia.com/). Our main contact there is Sam Hu.
I'm (Leo McElroy) going to describe how to order a kit from a contract manufacturer using Sam as an example.

The relationship with Sam was built when I traveled to Shenzhen in January 2024 to find a supplier. 
It's helpful to have a relationship with your supplier in China as a lot of communication can happen informally.
Sam and I communicate through email and WeChat.

I met a few contract manufacturers (who were all very welcoming and friendly). 
I provided each of them with the [BOM](https://raw.githubusercontent.com/hackclub/blot/main/docs/BOM.toml) for the Blot and requested they pack and send me a sample kit.
Each of these kits cost around $100 - $200.
Sam was the most expedient and thorough in this task. 
Sam prefers to view the BOM as a table and to download it as a CSV (as is the case with most contract manufacturers I spoke to) so I wrote [this utility website](https://leomcelroy.com/toml-table-viewer/?src=https://raw.githubusercontent.com/hackclub/blot/main/docs/BOM.toml) to provide that functionality.

The important columns are

  - the part name
  - the quantity
  - an example source
    - Sam will find a supplier in China for must parts but you can specify if he needs to purchase from the provided source
    - for parts that Sam will make you can link the design files such as stls (for 3D prints) or Gerbers, boms, component placements (for circuits)
  - any additional notes

It's helpful to include images as well. 
For the Blot Sam 3D prints some parts and also fabricates a metal plate for the plate we provide DXF and STEP files.

You can also specify how you would like your parts to be packed, such as creating a custom box or foam.
Sam might also have clarifying questions about the job such as
 
  - Is this supplier an appropiate subsitute for the example provided?
  - Would you rather this part be laser cut or machined?
  - How big would you like the shipping box to be?
  - etc.

After answering these questions the test package took around 1-2 weeks to arrive.

I evaluated the kit by building the Blot taking note of any changes that needed to be made.

Some examples of changes from our first order was I determined the T-nuts we used were too difficult to place so we swapped them for some spring loaded notes.
We also discovered that I had specified the wrong units for the belt length (which Sam caught!), the proper units could be inferred fortunately so the belt length was still acceptable. 

After okaying the kit we order them by requesting an invoice from Sam which is fulfilled by our payment office (thanks Mel!).




