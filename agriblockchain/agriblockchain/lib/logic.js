/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Write your transction processor functions here
 */

/**
   * When a farmer adds a Product to the blockchain.
   * This creates the Product asset automatically on the blockchain.
   * @param {org.supplychain.network.addProduct} newP - the new Product that we create
   * @transaction
   */
  async function addProduct(newP) {
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Farmer');
    var NS = 'org.supplychain.network'; 
    var product = getFactory().newResource(NS, 'Product', Math.random().toString(36).substring(3)); 
    product.name = newP.name;
    product.quantity = newP.quantity;
    product.price = newP.price;
    product.role = newP.role;
    product.traderId = newP.traderId;
    product.firstName = newP.firstName;
    product.lastName = newP.lastName;
    product.phoneNumber = newP.phoneNumber;
    product.status = newP.status;

    var addProductEvent = getFactory().newEvent('org.supplychain.network', 'addProductNotification');
    addProductEvent.name = newP.name;
    addProductEvent.quantity = newP.quantity;
    addProductEvent.price = newP.price;
    addProductEvent.role = newP.role;
    addProductEvent.status = newP.status;
    addProductEvent.traderId = newP.traderId;
    addProductEvent.firstName = newP.firstName;
    addProductEvent.lastName = newP.lastName;
    addProductEvent.phoneNumber = newP.phoneNumber;
        emit(addProductEvent);

    const productRegistry = await getAssetRegistry('org.supplychain.network.Product');
    await productRegistry.add(product);
    await participantRegistry.update(newP.farmer);
  }

/**
   * When a farmer Updates a Product to the blockchain.
   * This updates the Product asset automatically on the blockchain.
   * @param {org.supplychain.network.updateProduct} up
   * @transaction
   */
  async function updateProduct(up) {
    const participantRegistryFar = await getParticipantRegistry('org.supplychain.network.Farmer');
    const participantRegistryDist = await getParticipantRegistry('org.supplychain.network.Distributor');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(up.pid);
    if(exists){
      if(exists.role == 'FARMER'){
        const updateProduct = await assetRegistry.get(up.pid);
        updateProduct.quantity = up.quantity;
        updateProduct.price = up.price;
        var updateProductEvent = getFactory().newEvent('org.supplychain.network', 'updateProductNotification');
        updateProductEvent.name = up.name;
        updateProductEvent.quantity = up.quantity;
        updateProductEvent.price = up.price;
        updateProductEvent.role = up.role;
        updateProductEvent.status = up.status;
        emit(updateProductEvent);
        await assetRegistry.update(updateProduct);
        await participantRegistryFar.update(up.farmer)
      }
      if(exists.role == 'DISTRIBUTOR'){
        const updateProduct = await assetRegistry.get(up.pid);
        updateProduct.price = up.price;
        
        var updateProductEvent = getFactory().newEvent('org.supplychain.network', 'updateProductNotification');
        updateProductEvent.name = up.name;
        updateProductEvent.quantity = up.quantity;
        updateProductEvent.price = up.price;
        updateProductEvent.role = up.role;
        updateProductEvent.status = up.status;
        updateProductEvent.traderId = up.traderId;
        updateProductEvent.firstName = up.firstName;
        updateProductEvent.lastName = up.lastName;
        updateProductEvent.phoneNumber = up.phoneNumber;
        emit(updateProductEvent);
        await assetRegistry.update(updateProduct);
        await participantRegistryDist.update(up.distributor)
      }     
    }
    
    else{
    throw new Error('the product you specified does not exist!');
    }
  }
  
/**
   * When a farmer is added to the blockchain.
   * @param {org.supplychain.network.addFarmer} far
   * @transaction
   */

async function addFarmer(far) {
  var NS = 'org.supplychain.network'; 
  var participant = getFactory().newResource(NS, 'Farmer', Math.random().toString(36).substring(3));
    participant.firstName = far.firstName;
    participant.lastName = far.lastName;
    participant.gender = far.gender;
    participant.dob = far.dob;
    participant.email = far.email;
    participant.phoneNumber = far.phoneNumber;
    participant.street = far.street;
    participant.city = far.city;
    participant.country = far.country;
    participant.postalCode = far.postalCode;
    participant.password = far.password;
    participant.role = far.role;
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Farmer');
    await participantRegistry.add(participant);
  
} 

/**
   * When a Distributor is added to the blockchain.
   * This adds Distributor automatically on the blockchain.
   * @param {org.supplychain.network.addDistributor} dis
   * @transaction
   */

async function addDistributor(dis) {
   var NS = 'org.supplychain.network'; 
   var participant = getFactory().newResource(NS, 'Distributor', Math.random().toString(36).substring(3));
    participant.firstName = dis.firstName;
    participant.lastName = dis.lastName;
    participant.gender = dis.gender;
    participant.dob = dis.dob;
    participant.email = dis.email;
    participant.phoneNumber = dis.phoneNumber;
    participant.street = dis.street;
    participant.city = dis.city;
    participant.country = dis.country;
    participant.postalCode = dis.postalCode;
    participant.password = dis.password;
    participant.role = dis.role;
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Distributor');
    await participantRegistry.add(participant);
  
}
  
/**
   * When a Retailer is added to the blockchain.
   * This adds Retailer automatically on the blockchain.
   * @param {org.supplychain.network.addRetailer} ret
   * @transaction
   */

async function addRetailer(ret) {
   var NS = 'org.supplychain.network'; 
   var participant = getFactory().newResource(NS, 'Retailer', Math.random().toString(36).substring(3));
    participant.firstName = ret.firstName;
    participant.lastName = ret.lastName;
    participant.gender = ret.gender;
    participant.dob = ret.dob;
    participant.email = ret.email;
    participant.phoneNumber = ret.phoneNumber;
    participant.street = ret.street;
    participant.city = ret.city;
    participant.country = ret.country;
    participant.postalCode = ret.postalCode;
    participant.password = ret.password;
    participant.role = ret.role;
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Retailer');
    await participantRegistry.add(participant);
  
}

/**
   * When Distributor adds is needs to the blockchain.
   * This adds the needOfDistributor automatically on the blockchain.
   * @param {org.supplychain.network.needOfDistributor} nod
   * @transaction
   */

async function needOfDistributor(nod) {
  const participantRegistry = await getParticipantRegistry('org.supplychain.network.Distributor');
  var NS = 'org.supplychain.network';
  var needProduct = getFactory().newResource(NS, 'Product', Math.random().toString(36).substring(3)); 
    needProduct.name = nod.name;
    needProduct.quantity = nod.quantity;
    needProduct.price = nod.price;
  	needProduct.status = nod.status;
    needProduct.traderId = nod.traderId;
    needProduct.firstName = nod.firstName;
  	needProduct.lastName = nod.lastName;
    needProduct.role = nod.role;
  	needProduct.phoneNumber = nod.phoneNumber;
    const productRegistry = await getAssetRegistry('org.supplychain.network.Product');
    await productRegistry.add(needProduct);
    await participantRegistry.update(nod.distributor);
}

/**
   * When a Distributor updates is needs to the blockchain.
   * This updates the needOfDistributor automatically on the blockchain.
   * @param {org.supplychain.network.updateNeedDistributor} und - the new Product that we create
   * @transaction
   */
  async function updateNeedDistributor(und) {
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Distributor');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.exists(und.pid);
    if(exists){
      const updateNeed = await assetRegistry.get(und.pid);
      updateNeed.pid = und.pid
      updateNeed.name = und.name;
      updateNeed.quantity = und.quantity;
      updateNeed.price = und.price;
      await assetRegistry.update(updateNeed);
    }
    else{
    throw new Error('the product you specified does not exist!');
    }
  }

/**
   * When Retailer adds is needs to the blockchain.
   * This adds the needOfRetailer automatically on the blockchain.
   * @param {org.supplychain.network.needOfRetailer} nor
   * @transaction
   */

async function needOfRetailer(nor) {
  const participantRegistry = await getParticipantRegistry('org.supplychain.network.Retailer');
  var NS = 'org.supplychain.network';
  var needProduct = getFactory().newResource(NS, 'Product', Math.random().toString(36).substring(3)); 
    needProduct.name = nor.name;
    needProduct.quantity = nor.quantity;
    needProduct.price = nor.price;
  	needProduct.status = nor.status;
    needProduct.traderId = nor.traderId;
    needProduct.firstName = nor.firstName;
  	needProduct.lastName = nor.lastName;
    needProduct.role = nor.role;
  	needProduct.phoneNumber = nor.phoneNumber;
    const productRegistry = await getAssetRegistry('org.supplychain.network.Product');
    await productRegistry.add(needProduct);
    await participantRegistry.update(nor.retailer);
}

/**
   * When Retailer updates is needs to the blockchain.
   * This updates the needOfRetailer automatically on the blockchain.
   * @param {org.supplychain.network.updateNeedRetailer} unr
   * @transaction
   */
  async function updateNeedRetailer(unr) {
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Retailer');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.exists(unr.pid);
    if(exists){
      const updateNeed = await assetRegistry.get(unr.pid);
      updateNeed.pid = unr.pid
      updateNeed.name = unr.name;
      updateNeed.quantity = unr.quantity;
      updateNeed.price = unr.price;
      await assetRegistry.update(updateNeed);
    }
    else{
    throw new Error('the product you specified does not exist!');
    }
  }
 
/**
   * When a Distributor places an order for a Product in the blockchain.
   * @param {org.supplychain.network.orderByDistributor} obd
   * @transaction
   */

	async function orderByDistributor(obd){
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Distributor');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(obd.pid);
    if (exists.status == 'NA')
      {
        if (exists.role == 'FARMER'){
        	const product = await assetRegistry.get(obd.pid);
      		product.name = obd.name;
      		product.quantity = obd.quantity;
      		product.price = obd.price;
        	product.status = obd.status;
          product.traderId = obd.traderId;
    	  	product.firstName = obd.firstName;
          product.lastName = obd.lastName;
          product.phoneNumber= obd.phoneNumber;
    		  product.role = obd.role;
        	await assetRegistry.update(product);
          
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error('the product you specified is not available');
      }
    }

/**
   * When a Retailer places an order for a Product in the blockchain.
   * @param {org.supplychain.network.orderByRetailer} obr
   * @transaction
   */

	async function orderByRetailer(obr){
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Distributor');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(obr.pid);
    if (exists.status == 'NA' || exists.status == 'DISTRIBUTOR_REQUEST_APPROVED')
      {
        if (exists.role == 'FARMER' || exists.role == 'DISTRIBUTOR'){
        	const product = await assetRegistry.get(obr.pid);
      		product.name = obr.name;
      		product.quantity = obr.quantity;
      		product.price = obr.price;
        	product.status = obr.status;
          product.traderId = obr.traderId;
    		  product.firstName = obr.firstName;
          product.lastName = obr.lastName;
          product.phoneNumber= obr.phoneNumber;
    		  product.role = obr.role;
        	await assetRegistry.update(product);
          
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error('the product you specified is not available');
      }
    }
 
/**
   * When a farmer accepts the order request of a Product from distributor & Retailer in the blockchain.
   * @param {org.supplychain.network.acceptOrderByFarmer} aof
   * @transaction
   */

	async function acceptOrderByFarmer(aof){
    const participantRegistryFar = await getParticipantRegistry('org.supplychain.network.Farmer');
    const participantRegistryDist = await getParticipantRegistry('org.supplychain.network.Distributor');
    const participantRegistryRet = await getParticipantRegistry('org.supplychain.network.Retailer');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(aof.pid);
    if (exists.status == 'RETAILER_REQUEST_PENDING')
      {
        if (exists.role == 'FARMER') {
        	const product = await assetRegistry.get(aof.pid);
      		product.name = aof.name;
      		product.quantity = aof.quantity;
      		product.price = aof.price;
          	product.role = aof.role;
        	product.status = aof.status;
            product.traderId = aof.traderId;
            product.firstName = aof.firstName;
  			product.lastName = aof.lastName;
        product.phoneNumber = aof.phoneNumber;
        var acceptOrderByFarmerEvent = getFactory().newEvent('org.supplychain.network', 'acceptOrderByFarmerNotification');
        acceptOrderByFarmerEvent.name = aof.name;
      	acceptOrderByFarmerEvent.quantity = aof.quantity;
      	acceptOrderByFarmerEvent.price = aof.price;
        acceptOrderByFarmerEvent.role = aof.role;
        acceptOrderByFarmerEvent.status = aof.status;
        acceptOrderByFarmerEvent.traderId = aof.traderId;
        acceptOrderByFarmerEvent.firstName = aof.firstName;
  			acceptOrderByFarmerEvent.lastName = aof.lastName;
        acceptOrderByFarmerEvent.phoneNumber = aof.phoneNumber;
        emit(acceptOrderByFarmerEvent);
        	await assetRegistry.update(product);
            await participantRegistryRet.update(aof.retailer);
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
     else if (exists.status == 'DISTRIBUTOR_REQUEST_PENDING')
      {
        if (exists.role == 'FARMER') {
        	const product = await assetRegistry.get(aof.pid);
      		product.name = aof.name;
      		product.quantity = aof.quantity;
      		product.price = aof.price;
          	product.role = aof.role;
        	product.status = aof.status;
            product.traderId = aof.traderId;
            product.firstName = aof.firstName;
  			product.lastName = aof.lastName;
        product.phoneNumber = aof.phoneNumber;
        var acceptOrderByFarmerEvent = getFactory().newEvent('org.supplychain.network', 'acceptOrderByFarmerNotification');
        acceptOrderByFarmerEvent.name = aof.name;
      	acceptOrderByFarmerEvent.quantity = aof.quantity;
      	acceptOrderByFarmerEvent.price = aof.price;
        acceptOrderByFarmerEvent.role = aof.role;
        acceptOrderByFarmerEvent.status = aof.status;
        acceptOrderByFarmerEvent.traderId = aof.traderId;
        acceptOrderByFarmerEvent.firstName = aof.firstName;
  			acceptOrderByFarmerEvent.lastName = aof.lastName;
        acceptOrderByFarmerEvent.phoneNumber = aof.phoneNumber;
        emit(acceptOrderByFarmerEvent);
        	await assetRegistry.update(product);
            await participantRegistryDist.update(aof.distributor);
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error(' method error ');
      }
    }

/**
   * When a farmer rejects the order request of a Product from distributor & Retailer in the blockchain.
   * @param {org.supplychain.network.rejectOrderByFarmer} rof
   * @transaction
   */

	async function rejectOrderByFarmer(rof){
    const participantRegistryFar = await getParticipantRegistry('org.supplychain.network.Farmer');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(rof.pid);
    if (exists.status == 'RETAILER_REQUEST_PENDING')
      {
        if (exists.role == 'FARMER') {
        	const product = await assetRegistry.get(rof.pid);
      		product.name = rof.name;
      		product.quantity = rof.quantity;
      		product.price = rof.price;
          product.role = rof.role;
        	product.status = rof.status;
          product.firstName = rof.firstName;
  			  product.lastName = rof.lastName;
  			  product.phoneNumber = rof.phoneNumber;
        	await assetRegistry.update(product);
          	await participantRegistryFar.update(rof.farmer);
            
          } 
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new('the product you are trying to order is not owned by farmer');
      	}
      }
      else if (exists.status == 'DISTRIBUTOR_REQUEST_PENDING')
      {
        if (exists.role == 'FARMER') {
        	const product = await assetRegistry.get(rof.pid);
      		product.name = rof.name;
      		product.quantity = rof.quantity;
      		product.price = rof.price;
          product.role = rof.role;
        	product.status = rof.status;
          product.firstName = rof.firstName;
  			  product.lastName = rof.lastName;
          product.phoneNumber = rof.phoneNumber;
        	await assetRegistry.update(product);
          	await participantRegistryFar.update(rof.farmer);
            
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error('the product you specified is not available');
      }
    }
/**
   * When a Distributor accepts the order request of a Product from Retailer in the blockchain.
   * @param {org.supplychain.network.acceptOrderByDistributor} aod
   * @transaction
   */

	async function acceptOrderByDistributor(aod){
      const participantRegistryDist = await getParticipantRegistry('org.supplychain.network.Distributor');
      const participantRegistryRet = await getParticipantRegistry('org.supplychain.network.Retailer');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(aod.pid);
    if (exists.status == 'RETAILER_REQUEST_PENDING')
      {
        if (exists.role == 'DISTRIBUTOR') {
        	const product = await assetRegistry.get(aod.pid);
      		product.name = aod.name;
      		product.quantity = aod.quantity;
      		product.price = aod.price;
          	product.role = aod.role;
        	product.status = aod.status;
            product.traderId = aod.traderId;
            product.firstName = aod.firstName;
  			product.lastName = aod.lastName;
        product.phoneNumber = aod.phoneNumber;
        var acceptOrderByDistributorEvent = getFactory().newEvent('org.supplychain.network', 'acceptOrderByDistributorNotification');
        acceptOrderByDistributorEvent.name = aod.name;
      	acceptOrderByDistributorEvent.quantity = aod.quantity;
      	acceptOrderByDistributorEvent.price = aod.price;
        acceptOrderByDistributorEvent.role = aod.role;
        acceptOrderByDistributorEvent.status = aod.status;
        acceptOrderByDistributorEvent.traderId = aod.traderId;
        acceptOrderByDistributorEvent.firstName = aod.firstName;
  			acceptOrderByDistributorEvent.lastName = aod.lastName;
        acceptOrderByDistributorEvent.phoneNumber = aod.phoneNumber;
        emit(acceptOrderByDistributorEvent);
        	await assetRegistry.update(product);
          	await participantRegistryRet.update(aod.retailer);
          } 
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error('the product you specified is not available');
      }
    }
/**
   * When a Distributor Rejects the order request of a Product from Retailer in the blockchain.
   * @param {org.supplychain.network.rejectOrderByDistributor} rod
   * @transaction
   */

	async function rejectOrderByDistributor(rod){
    const participantRegistryDist = await getParticipantRegistry('org.supplychain.network.Distributor');
    var NS = 'org.supplychain.network';
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(rod.pid);
    if (exists.status == 'RETAILER_REQUEST_PENDING')
      {
        if (exists.role == 'DISTRIBUTOR') {
        	const product = await assetRegistry.get(rod.pid);
      		product.name = rod.name;
      		product.quantity = rod.quantity;
      		product.price = rod.price;
          product.role = rod.role;
        	product.status = rod.status;
          product.firstName = rod.firstName;
  		    product.lastName = rod.lastName;
  		    product.phoneNumber = rod.phoneNumber;
        	await assetRegistry.update(product);
          	await participantRegistryDist.update(rod.distributor);
          }
      	else{
          console.log('the product you are trying to order is not owned by farmer')
          throw new Error('the product you are trying to order is not owned by farmer');
      	}
      }
      else {
        console.log('the product you specified is not available')
        throw new Error('the product you specified is not available');
      }
    }

/**
   * When a trader logs in .
   * @param {org.supplychain.network.loginVerification} logObj
   * @transaction
*/

async function loginVerification(logObj){
    const participantRegistry = await getParticipantRegistry('org.supplychain.network.Trader');
    var NS = 'org.supplychain.network';
    const traderExists = await participantRegistry.get(logObj.email);
    console.log(traderExists);
    if(traderExists)
    {
      console.log('Hi');
      if(traderExists.email == logObj.email && traderExists.password == logObj.password) {
        console.log('Inner');
        var loginEvent = getFactory().newEvent('org.supplychain.network', 'loginNotification');
        loginEvent.email = logObj.email;
        emit(loginEvent);
        console.log('Success');
      }
      else {
        throw new Error('Username or Password is incorrect');
      }
    }
  else {
    throw new Error('Not registered, Please register');
  }
}


/**
   * When a farmer Updates a Product to the blockchain.
   * This updates the Product asset automatically on the blockchain.
   * @param {org.supplychain.network.deleteProduct} dp
   * @transaction
   */
  async function deleteProduct(dp) {
    const participantRegistryFar = await getParticipantRegistry('org.supplychain.network.Farmer');
    const participantRegistryDist = await getParticipantRegistry('org.supplychain.network.Distributor');
    const participantRegistryRet = await getParticipantRegistry('org.supplychain.network.Retailer');
    const assetRegistry = await getAssetRegistry('org.supplychain.network.Product');
    const exists = await assetRegistry.get(dp.pid);
    if (exists) {
      const deleteProduct = await assetRegistry.get(dp.pid);
      await assetRegistry.remove(deleteProduct);
      if (exists.role == 'Farmer') { 
        await participantRegistryFar.update(dp.framer);
      }
      else if (exists.role == 'Distributor') {
        await participantRegistryDist.update(dp.distributor);
      }
      else if (exists.role == 'Retailer') {
        await participantRegistryRet.update(dp.retailer);
      }
      
    }
  }
