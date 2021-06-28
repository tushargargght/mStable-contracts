import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FeederLogic, FeederLogicInterface } from "../FeederLogic";
export declare class FeederLogic__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FeederLogic>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FeederLogic;
    connect(signer: Signer): FeederLogic__factory;
    static readonly bytecode = "0x61466061003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100be5760003560e01c80638c913b941161007b5780638c913b94146101935780639e60b1c5146101b3578063b4ff6eae146101c6578063d1be5528146101e6578063dce9bf6a146101f9578063f134c4fb1461020c576100be565b80635c1ba5f0146100c35780635dd72f5d146100fd5780636089efbc146101105780636fdc2ea21461013e5780637116e8181461016d5780637cdc8e4014610180575b600080fd5b8180156100cf57600080fd5b506100e36100de366004613f8f565b61022c565b604080519283526020830191909152015b60405180910390f35b6100e361010b366004613d33565b610451565b81801561011c57600080fd5b5061013061012b366004614007565b61049f565b6040519081526020016100f4565b81801561014a57600080fd5b5061015e6101593660046140b1565b6105bf565b6040516100f493929190614298565b61013061017b366004613c42565b610a7d565b61013061018e366004613c42565b610bf7565b81801561019f57600080fd5b506100e36101ae36600461411b565b610e09565b6101306101c1366004613d7f565b6112cb565b8180156101d257600080fd5b506101306101e1366004613efe565b61148d565b6101306101f4366004613d7f565b6118d4565b6100e3610207366004613dda565b611a23565b81801561021857600080fd5b506100e3610227366004614059565b611cc4565b600080600089600601805480602002602001604051908101604052809291908181526020016000905b8282101561029e57600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b9091041681830152825260019092019101610255565b50505050905060006102d18b8b8036038101906102bb9190613ee3565b846102cb368e90038e018e613e92565b8b611e40565b90506102e36060890160408a01613e5a565b1561031d576103138b6102fb368d90038d018d613ee3565b848461030c368e90038e018e613e92565b8b8b6120b0565b9094509250610443565b60008b60050160008154811061034357634e487b7160e01b600052603260045260246000fd5b60009182526020909120600290910201546001600160a01b031690506103a78c610372368e90038e018e613ee3565b85856040518060600160405280600060ff168152602001876001600160a01b03168152602001600115158152506000306120b0565b90955093506001600160a01b0381166343bcfab66103cb60408c0160208d01613c28565b878a8a6040518563ffffffff1660e01b81526004016103ed949392919061420b565b602060405180830381600087803b15801561040757600080fd5b505af115801561041b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043f91906141bd565b9450505b505097509795505050505050565b6000806000806104608661232f565b9150915061047382828760200151612443565b855190935061048a84670de0b6b3a7640000614532565b61049491906143e1565b935050509250929050565b60008086600601805480602002602001604051908101604052809291908181526020016000905b8282101561050f57600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b90910416818301528252600190920191016104c6565b5050505090506000610542888880360381019061052c9190613ee3565b8461053c368b90038b018b613e92565b89611e40565b905061056382826000015183602001518a8036038101906101f49190613ee3565b9250838310156105b45760405162461bcd60e51b81526020600482015260176024820152764d696e74207175616e74697479203c206d696e2071747960481b60448201526064015b60405180910390fd5b505095945050505050565b60006060806105db89600101548861259d90919063ffffffff16565b925060006105f38a6105ee8a8c35614579565b6125b2565b905060008a600601805480602002602001604051908101604052809291908181526020016000905b8282101561066457600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b909104168183015282526001909201910161061b565b50508251929350829150506001600160401b0381111561069457634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156106bd578160200160208202803683370190505b509450806001600160401b038111156106e657634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561070f578160200160208202803683370190505b50935060005b81811015610a6d5760008c3561072b898e614579565b85848151811061074b57634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516001600160801b031661076a9190614532565b61077491906143e1565b9050600181116107b45760405162461bcd60e51b815260206004820152600b60248201526a04f7574707574203d3d20360ac1b60448201526064016105ab565b6107bf600182614579565b90508a8a838181106107e157634e487b7160e01b600052603260045260246000fd5b9050602002013581101561082e5760405162461bcd60e51b815260206004820152601460248201527362417373657420717479203c206d696e2071747960601b60448201526064016105ab565b808e600501838154811061085257634e487b7160e01b600052603260045260246000fd5b600091825260209091206002909102015487516001600160a01b039091169088908590811061089157634e487b7160e01b600052603260045260246000fd5b602002602001018985815181106108b857634e487b7160e01b600052603260045260246000fd5b60200260200101826001600160a01b03166001600160a01b03168152508281525050506109d2818f600501848154811061090257634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b90910416600781111561098057634e487b7160e01b600052602160045260246000fd5b600781111561099f57634e487b7160e01b600052602160045260246000fd5b815250508685815181106109c357634e487b7160e01b600052603260045260246000fd5b60200260200101518c896125d7565b6109db816128ab565b8483815181106109fb57634e487b7160e01b600052603260045260246000fd5b602002602001015160200151610a119190614551565b8e6006018381548110610a3457634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b0292169190911790555080610a65816145bc565b915050610715565b5050505096509650969350505050565b6000806000610a8b8761232f565b915091506000610aa083838760200151612443565b8751909150600080805b83811015610bb0578a8181518110610ad257634e487b7160e01b600052603260045260246000fd5b602002602001015192506305f5e1008c8460ff1681518110610b0457634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b03168b8381518110610b3957634e487b7160e01b600052603260045260246000fd5b6020026020010151610b4b9190614532565b610b5591906143e1565b915081878460ff1681518110610b7b57634e487b7160e01b600052603260045260246000fd5b60200260200101818151610b8f91906143a3565b905250610b9c82876143a3565b955080610ba8816145bc565b915050610aaa565b50610bc086868a60400151612918565b610bdc5760405162461bcd60e51b81526004016105ab90614269565b610be88686868b6129c2565b9b9a5050505050505050505050565b6000806000610c058761232f565b915091506000610c1a83838760200151612443565b87519091506000805b82811015610d4d576305f5e1008b8b8381518110610c5157634e487b7160e01b600052603260045260246000fd5b602002602001015160ff1681518110610c7a57634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b03168a8381518110610caf57634e487b7160e01b600052603260045260246000fd5b6020026020010151610cc19190614532565b610ccb91906143e1565b915081868b8381518110610cef57634e487b7160e01b600052603260045260246000fd5b602002602001015160ff1681518110610d1857634e487b7160e01b600052603260045260246000fd5b60200260200101818151610d2c9190614579565b905250610d398286614579565b945080610d45816145bc565b915050610c23565b50610d5d85858960400151612918565b610d795760405162461bcd60e51b81526004016105ab90614269565b6000610d8a86868a60200151612443565b905083610d978282614579565b8951610da39190614532565b610dad91906143e1565b9650620f42408711610dfb5760405162461bcd60e51b81526020600482015260176024820152764d7573742072656465656d203e2031653620756e69747360481b60448201526064016105ab565b505050505050949350505050565b60008060008a600601805480602002602001604051908101604052809291908181526020016000905b82821015610e7b57600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b9091041681830152825260019092019101610e32565b5050505090506000610f00828b8b8080602002602001604051908101604052809392919081815260200183836020028082843760009201919091525050604080516020808f0282810182019093528e82529093508e92508d918291850190849080828437600081840152601f19601f820116905080830192505050505050508e610bf7565b9050610f248c60010154670de0b6b3a7640000610f1d9190614579565b8290612a1b565b9350610f308185614579565b925060008411610f825760405162461bcd60e51b815260206004820152601860248201527f4d7573742072656465656d20736f6d65206d417373657473000000000000000060448201526064016105ab565b610f8d6001856143a3565b935085841115610fdf5760405162461bcd60e51b815260206004820181905260248201527f52656465656d206d417373657420717479203e206d6178207175616e7469747960448201526064016105ab565b6000610ff58d868e600001516105ee9190614579565b905060005b888110156112ba5761118c8a8a8381811061102557634e487b7160e01b600052603260045260246000fd5b905060200201358f6005018e8e8581811061105057634e487b7160e01b600052603260045260246000fd5b905060200201602081019061106591906141d5565b60ff168154811061108657634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b90910416600781111561110457634e487b7160e01b600052602160045260246000fd5b600781111561112357634e487b7160e01b600052602160045260246000fd5b905250868f8f8681811061114757634e487b7160e01b600052603260045260246000fd5b905060200201602081019061115c91906141d5565b60ff168151811061117d57634e487b7160e01b600052603260045260246000fd5b60200260200101518a866125d7565b6111bb8a8a838181106111af57634e487b7160e01b600052603260045260246000fd5b905060200201356128ab565b848d8d848181106111dc57634e487b7160e01b600052603260045260246000fd5b90506020020160208101906111f191906141d5565b60ff168151811061121257634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516112289190614551565b8e6006018d8d8481811061124c57634e487b7160e01b600052603260045260246000fd5b905060200201602081019061126191906141d5565b60ff168154811061128257634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b029216919091179055806112b2816145bc565b915050610ffa565b505050509850989650505050505050565b6000620f424083116113195760405162461bcd60e51b81526020600482015260176024820152764d7573742072656465656d203e2031653620756e69747360481b60448201526064016105ab565b6000806113258761232f565b91509150600061133a83838760200151612443565b855190915060009061134c8882614579565b6113569084614532565b61136091906143e1565b61136b9060016143a3565b9050600061137f8588602001518b85612a30565b90506000600182878c60ff16815181106113a957634e487b7160e01b600052603260045260246000fd5b60200260200101516113bb9190614579565b6113c59190614579565b90508a8a60ff16815181106113ea57634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b0316816305f5e10061140f9190614532565b61141991906143e1565b965080868b60ff168151811061143f57634e487b7160e01b600052603260045260246000fd5b602002602001018181516114539190614579565b9052506114608186614579565b945061147186868a60400151612918565b610dfb5760405162461bcd60e51b81526004016105ab90614269565b60008481816001600160401b038111156114b757634e487b7160e01b600052604160045260246000fd5b6040519080825280602002602001820160405280156114e0578160200160208202803683370190505b50905060008a600601805480602002602001604051908101604052809291908181526020016000905b8282101561155257600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b9091041681830152825260019092019101611509565b50505050905060006115688c8c600001356125b2565b905060005b848110156117d957600089898381811061159757634e487b7160e01b600052603260045260246000fd5b9050602002013511156117c75760008b8b838181106115c657634e487b7160e01b600052603260045260246000fd5b90506020020160208101906115db91906141d5565b90506000848260ff168151811061160257634e487b7160e01b600052603260045260246000fd5b6020026020010151905061170d8f6005018360ff168154811061163557634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b9091041660078111156116b357634e487b7160e01b600052602160045260246000fd5b60078111156116d257634e487b7160e01b600052602160045260246000fd5b90525082516001600160801b03168d8d8781811061170057634e487b7160e01b600052603260045260246000fd5b9050602002013587612bc1565b86848151811061172d57634e487b7160e01b600052603260045260246000fd5b60200260200101818152505061176986848151811061175c57634e487b7160e01b600052603260045260246000fd5b60200260200101516128ab565b81602001516117789190614378565b8f6006018360ff168154811061179e57634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b02921691909117905550505b806117d1816145bc565b91505061156d565b50611832828b8b80806020026020016040519081016040528093929190818152602001838360200280828437600081840152601f19601f82011690508083019250505050505050858e80360381019061017b9190613ee3565b94508585101561187e5760405162461bcd60e51b81526020600482015260176024820152764d696e74207175616e74697479203c206d696e2071747960481b60448201526064016105ab565b600085116118c55760405162461bcd60e51b81526020600482015260146024820152735a65726f206d4173736574207175616e7469747960601b60448201526064016105ab565b50505050979650505050505050565b60008060006118e28761232f565b9150915060006118f783838760200151612443565b905060006305f5e100898960ff168151811061192357634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b0316886119439190614532565b61194d91906143e1565b9050620f424081116119985760405162461bcd60e51b81526020600482015260146024820152734d75737420616464203e2031653620756e69747360601b60448201526064016105ab565b80848960ff16815181106119bc57634e487b7160e01b600052603260045260246000fd5b602002602001018181516119d091906143a3565b9052506119dd81846143a3565b92506119ee84848860400151612918565b611a0a5760405162461bcd60e51b81526004016105ab90614269565b611a16848484896129c2565b9998505050505050505050565b600080600080611a328a61232f565b915091506000611a4783838860200151612443565b905060006305f5e1008c8c60ff1681518110611a7357634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b03168a611a939190614532565b611a9d91906143e1565b9050620f42408111611ae85760405162461bcd60e51b81526020600482015260146024820152734d75737420616464203e2031653620756e69747360601b60448201526064016105ab565b80848c60ff1681518110611b0c57634e487b7160e01b600052603260045260246000fd5b60200260200101818151611b2091906143a3565b905250611b2d81846143a3565b92506000611b4085858a60200151612443565b9050670de0b6b3a764000089611b568584614579565b611b609190614532565b611b6a91906143e1565b95506000611b89868a602001518e8a88611b8491906143a3565b612a30565b89519091508490611b9a9089614532565b611ba491906143e1565b96506000600182888f60ff1681518110611bce57634e487b7160e01b600052603260045260246000fd5b6020026020010151611be09190614579565b611bea9190614579565b90508e8d60ff1681518110611c0f57634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b0316816305f5e100611c349190614532565b611c3e91906143e1565b985080878e60ff1681518110611c6457634e487b7160e01b600052603260045260246000fd5b60200260200101818151611c789190614579565b905250611c858187614579565b9550611c9687878c60400151612918565b611cb25760405162461bcd60e51b81526004016105ab90614269565b50505050505050965096945050505050565b600080611cd76060870160408801613e5a565b15611d1057611d0688611cef368a90038a018a613ee3565b611cfe368a90038a018a613e92565b888888612ddd565b9092509050611e35565b600088600501600081548110611d3657634e487b7160e01b600052603260045260246000fd5b60009182526020909120600290910201546001600160a01b03169050611d9989611d65368b90038b018b613ee3565b6040518060600160405280600060ff168152602001856001600160a01b031681526020016001151581525089600030612ddd565b90935091506001600160a01b0381166343bcfab6611dbd60408a0160208b01613c28565b8588886040518563ffffffff1660e01b8152600401611ddf949392919061420b565b602060405180830381600087803b158015611df957600080fd5b505af1158015611e0d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e3191906141bd565b9250505b965096945050505050565b611e486139d4565b826040015115611f9e57600086600501846000015160ff1681548110611e7e57634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b909104166007811115611efc57634e487b7160e01b600052602160045260246000fd5b6007811115611f1b57634e487b7160e01b600052602160045260246000fd5b8152505090506000611f778287876000015160ff1681518110611f4e57634e487b7160e01b600052603260045260246000fd5b6020026020010151600001516001600160801b031686611f728c8c600001516125b2565b612bc1565b60408051606081018252875160ff168152602081019290925281019290925250905061200d565b611fb7868484611fb28a8a600001516125b2565b6130c3565b9050600081602001511161200d5760405162461bcd60e51b815260206004820152601b60248201527f4d757374206d696e7420736f6d657468696e672066726f6d206d70000000000060448201526064016105ab565b61201a81602001516128ab565b84826000015160ff168151811061204157634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516120579190614378565b86600601826000015160ff168154811061208157634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b02921691909117905595945050505050565b83518351602086015160009283926120df928a92919060ff8216156120d6578d546120d9565b60005b8d611a23565b9092509050838210156121345760405162461bcd60e51b815260206004820152601860248201527f4f757470757420717479203c206d696e696d756d20717479000000000000000060448201526064016105ab565b6000821161217b5760405162461bcd60e51b81526020600482015260146024820152735a65726f206f7574707574207175616e7469747960601b60448201526064016105ab565b61228b828a600501876000015160ff16815481106121a957634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b90910416600781111561222757634e487b7160e01b600052602160045260246000fd5b600781111561224657634e487b7160e01b600052602160045260246000fd5b90525087518a518b9160ff1690811061226f57634e487b7160e01b600052603260045260246000fd5b6020026020010151866122868e8e600001516125b2565b6125d7565b612294826128ab565b87866000015160ff16815181106122bb57634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516122d19190614551565b89600601866000015160ff16815481106122fb57634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b029216919091179055909890975095505050505050565b8051606090600090806001600160401b0381111561235d57634e487b7160e01b600052604160045260246000fd5b604051908082528060200260200182016040528015612386578160200160208202803683370190505b5092506000805b8281101561243b5760008682815181106123b757634e487b7160e01b600052603260045260246000fd5b602002602001015190506305f5e100816000015182602001516123da919061450c565b6123e491906143bb565b6001600160801b031692508286838151811061241057634e487b7160e01b600052603260045260246000fd5b602090810291909101015261242583866143a3565b9450508080612433906145bc565b91505061238d565b505050915091565b60008261245257506000612596565b60008460018151811061247557634e487b7160e01b600052603260045260246000fd5b60200260200101518560008151811061249e57634e487b7160e01b600052603260045260246000fd5b60200260200101516124b09190614532565b905060006064866001815181106124d757634e487b7160e01b600052603260045260246000fd5b60200260200101518760008151811061250057634e487b7160e01b600052603260045260246000fd5b602002602001015161251291906143a3565b61251c8487614532565b61252691906143e1565b61253091906143e1565b90508061257160648461254382896143a3565b61254d9190614532565b61255791906143e1565b61256260028561443b565b61256c91906143a3565b61346c565b61257b9190614579565b612586906002614532565b6125919060016143a3565b925050505b9392505050565b60006125968383670de0b6b3a76400006135eb565b6000670de0b6b3a76400008360040154836125cd9190614532565b61259691906143e1565b846125e1576128a4565b60208401516001600160a01b0316612624576001600160a01b038216301415612609576128a4565b835161261f906001600160a01b03168387613602565b6128a4565b8360400151156126b2576020840151845160405163c89fc72f60e01b81526001600160a01b038581166004830152918216602482015260448101889052606481018890526001608482015291169063c89fc72f9060a401600060405180830381600087803b15801561269557600080fd5b505af11580156126a9573d6000803e3d6000fd5b505050506128a4565b835160208501516040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a082319060240160206040518083038186803b1580156126ff57600080fd5b505afa158015612713573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061273791906141bd565b90508581106127b6576020850151855160405163a4e2859560e01b81526001600160a01b03868116600483015291821660248201526044810189905291169063a4e2859590606401600060405180830381600087803b15801561279957600080fd5b505af11580156127ad573d6000803e3d6000fd5b505050506128a2565b83516000906002906127d29085906001600160801b031661366a565b6127dc91906143e1565b9050600061281e836127ee8a856143a3565b6127f89190614579565b612801856128ab565b88602001516128109190614551565b6001600160801b031661367b565b6020880151885160405163c89fc72f60e01b81526001600160a01b0389811660048301529182166024820152604481018c90526064810184905260006084820152929350169063c89fc72f9060a401600060405180830381600087803b15801561288757600080fd5b505af115801561289b573d6000803e3d6000fd5b5050505050505b505b5050505050565b6000600160801b82106129105760405162461bcd60e51b815260206004820152602760248201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316044820152663238206269747360c81b60648201526084016105ab565b50805b919050565b82516001906000805b828110156129b8578587828151811061294a57634e487b7160e01b600052603260045260246000fd5b6020026020010151670de0b6b3a76400006129659190614532565b61296f91906143e1565b915084602001516001600160801b0316821180612995575084516001600160801b031682105b156129a65760009350505050612596565b806129b0816145bc565b915050612921565b5050509392505050565b6000806129d486868560200151612443565b83519091506129ee576129e78482614579565b9150612a12565b836129f98183614579565b8451612a059190614532565b612a0f91906143e1565b91505b50949350505050565b6000816125cd670de0b6b3a764000085614532565b600060ff83161580612a4557508260ff166001145b612a815760405162461bcd60e51b815260206004820152600d60248201526c092dcecc2d8d2c840d2dcc8caf609b1b60448201526064016105ab565b600060ff841615612aba5785600081518110612aad57634e487b7160e01b600052603260045260246000fd5b6020026020010151612ae4565b85600181518110612adb57634e487b7160e01b600052603260045260246000fd5b60200260200101515b90506000612af36064876143a3565b90506000816064612b0560028861443b565b612b0f9190614532565b612b1991906143e1565b9050600082612b288988614532565b612b3291906143e1565b612b3d856004614532565b612b4790846143e1565b612b5191906143a3565b9050600084821015612b6c57612b678286614579565b612b76565b612b768583614579565b905060028583612b8a86612562858761443b565b612b9491906143a3565b612b9e9190614579565b612ba891906143e1565b612bb39060016143a3565b9a9950505050505050505050565b60208401516000906001600160a01b0316612bf2576000612be83330886000015187613690565b509150612dd59050565b6000612c08338760200151886000015187613690565b6040880151919350915015612cc157602086015186516040516307dba22560e31b81526001600160a01b03918216600482015260248101859052600160448201526000929190911690633edd112890606401602060405180830381600087803b158015612c7457600080fd5b505af1158015612c88573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612cac91906141bd565b9050612cb8818461367b565b92505050612dd5565b838214612d105760405162461bcd60e51b815260206004820152601b60248201527f4173736574206e6f742066756c6c79207472616e73666572726564000000000060448201526064016105ab565b6000612d1c848761366a565b905080821115612dd2576000612d336002836143e1565b612d3d9084614579565b602089015189516040516307dba22560e31b81526001600160a01b03918216600482015260248101849052600060448201529293501690633edd112890606401602060405180830381600087803b158015612d9757600080fd5b505af1158015612dab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612dcf91906141bd565b50505b50505b949350505050565b600080600088600601805480602002602001604051908101604052809291908181526020016000905b82821015612e4f57600084815260209081902060408051808201909152908401546001600160801b038082168352600160801b9091041681830152825260019092019101612e06565b505050509050612e6c89600101548761259d90919063ffffffff16565b8751909250612e87908290612e81858a614579565b8b6112cb565b925084831015612ed05760405162461bcd60e51b815260206004820152601460248201527362417373657420717479203c206d696e2071747960601b60448201526064016105ab565b60008311612f0e5760405162461bcd60e51b815260206004820152600b60248201526a04f7574707574203d3d20360ac1b60448201526064016105ab565b61301f838a600501896000015160ff1681548110612f3c57634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b909104166007811115612fba57634e487b7160e01b600052602160045260246000fd5b6007811115612fd957634e487b7160e01b600052602160045260246000fd5b90525089518451859160ff1690811061300257634e487b7160e01b600052603260045260246000fd5b6020026020010151876122868e8c8f600001516105ee9190614579565b613028836128ab565b81886000015160ff168151811061304f57634e487b7160e01b600052603260045260246000fd5b6020026020010151602001516130659190614551565b89600601886000015160ff168154811061308f57634e487b7160e01b600052603260045260246000fd5b600091825260209091200180546001600160801b03928316600160801b029216919091179055509097909650945050505050565b6130cb6139d4565b6040518060600160405280600060ff168152602001600081526020018660050160008154811061310b57634e487b7160e01b600052603260045260246000fd5b600091825260209182902060408051608081018252600290930290910180546001600160a01b03908116845260018201549081169484019490945260ff600160a01b8504811615159284019290925291926060840191600160a81b90910416600781111561318957634e487b7160e01b600052602160045260246000fd5b60078111156131a857634e487b7160e01b600052602160045260246000fd5b905250905260208501519091506131ca906001600160a01b03163330866137b9565b6040810151602001516000906001600160a01b0316156131f2578160400151602001516131f4565b305b6040808401515190516370a0823160e01b81526001600160a01b038084166004830152929350600092909116906370a082319060240160206040518083038186803b15801561324257600080fd5b505afa158015613256573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061327a91906141bd565b6040808501515160208901519151637ba5ff4760e11b81529293506001600160a01b03169163f74bfe8e916132b8918990600090889060040161420b565b602060405180830381600087803b1580156132d257600080fd5b505af11580156132e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061330a91906141bd565b506040838101515190516370a0823160e01b81526001600160a01b03848116600483015260009216906370a082319060240160206040518083038186803b15801561335457600080fd5b505afa158015613368573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061338c91906141bd565b90506133988282614579565b60208501526001600160a01b038316301461346157848111156134615760006133c26002876143e1565b6133cc9083614579565b6040868101515190516307dba22560e31b81526001600160a01b0391821660048201526024810183905260006044820152919250851690633edd112890606401602060405180830381600087803b15801561342657600080fd5b505af115801561343a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061345e91906141bd565b50505b505050949350505050565b60008161347b57506000612913565b816001600160801b82106134945760809190911c9060401b5b6801000000000000000082106134af5760409190911c9060201b5b64010000000082106134c65760209190911c9060101b5b6201000082106134db5760109190911c9060081b5b61010082106134ef5760089190911c9060041b5b601082106135025760049190911c9060021b5b6008821061350e5760011b5b600161351a82866143e1565b61352490836143a3565b901c9050600161353482866143e1565b61353e90836143a3565b901c9050600161354e82866143e1565b61355890836143a3565b901c9050600161356882866143e1565b61357290836143a3565b901c9050600161358282866143e1565b61358c90836143a3565b901c9050600161359c82866143e1565b6135a690836143a3565b901c905060016135b682866143e1565b6135c090836143a3565b901c905060006135d082866143e1565b90508082106135df57806135e1565b815b9350505050612913565b6000816135f88486614532565b612dd591906143e1565b6040516001600160a01b03831660248201526044810182905261366590849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526137f7565b505050565b6000816125cd6305f5e10085614532565b600081831161368a5782612596565b50919050565b6040516370a0823160e01b81526001600160a01b03848116600483015260009182918291908616906370a082319060240160206040518083038186803b1580156136d957600080fd5b505afa1580156136ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061371191906141bd565b90506137286001600160a01b0386168888876137b9565b6040516370a0823160e01b81526001600160a01b0387811660048301528616906370a082319060240160206040518083038186803b15801561376957600080fd5b505afa15801561377d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906137a191906141bd565b91506137ad8183614579565b92505094509492505050565b6040516001600160a01b03808516602483015283166044820152606481018290526137f19085906323b872dd60e01b9060840161362e565b50505050565b600061384c826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166138c99092919063ffffffff16565b805190915015613665578080602001905181019061386a9190613e76565b6136655760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016105ab565b6060612dd5848460008585843b6139225760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016105ab565b600080866001600160a01b0316858760405161393e91906141ef565b60006040518083038185875af1925050503d806000811461397b576040519150601f19603f3d011682016040523d82523d6000602084013e613980565b606091505b509150915061399082828661399b565b979650505050505050565b606083156139aa575081612596565b8251156139ba5782518084602001fd5b8160405162461bcd60e51b81526004016105ab9190614236565b60408051606081018252600080825260208201529081016139f36139f8565b905290565b604080516080810182526000808252602082018190529181018290529060608201906139f3565b80356001600160a01b038116811461291357600080fd5b600082601f830112613a46578081fd5b81356020613a5b613a5683614355565b614325565b82815281810190858301604080860288018501891015613a79578687fd5b865b86811015613a9f57613a8d8a84613b6d565b85529385019391810191600101613a7b565b509198975050505050505050565b60008083601f840112613abe578182fd5b5081356001600160401b03811115613ad4578182fd5b6020830191508360208083028501011115613aee57600080fd5b9250929050565b600082601f830112613b05578081fd5b81356020613b15613a5683614355565b8281528181019085830183850287018401881015613b31578586fd5b855b85811015613b4f57813584529284019290840190600101613b33565b5090979650505050505050565b60006060828403121561368a578081fd5b600060408284031215613b7e578081fd5b613b886040614325565b9050613b9382613c00565b8152613ba160208301613c00565b602082015292915050565b60006080828403121561368a578081fd5b600060808284031215613bce578081fd5b613bd86060614325565b90508135815260208201356020820152613bf58360408401613b6d565b604082015292915050565b80356001600160801b038116811461291357600080fd5b803560ff8116811461291357600080fd5b600060208284031215613c39578081fd5b61259682613a1f565b60008060008060e08587031215613c57578283fd5b84356001600160401b0380821115613c6d578485fd5b613c7988838901613a36565b9550602091508187013581811115613c8f578586fd5b8701601f81018913613c9f578586fd5b8035613cad613a5682614355565b81815284810190838601868402850187018d1015613cc957898afd5b8994505b83851015613cf257613cde81613c17565b835260019490940193918601918601613ccd565b5097505050506040870135915080821115613d0b578384fd5b50613d1887828801613af5565b925050613d288660608701613bbd565b905092959194509250565b60008060a08385031215613d45578182fd5b82356001600160401b03811115613d5a578283fd5b613d6685828601613a36565b925050613d768460208501613bbd565b90509250929050565b60008060008060e08587031215613d94578182fd5b84356001600160401b03811115613da9578283fd5b613db587828801613a36565b945050613dc460208601613c17565b925060408501359150613d288660608701613bbd565b6000806000806000806101208789031215613df3578384fd5b86356001600160401b03811115613e08578485fd5b613e1489828a01613a36565b965050613e2360208801613c17565b9450613e3160408801613c17565b93506060870135925060808701359150613e4e8860a08901613bbd565b90509295509295509295565b600060208284031215613e6b578081fd5b813561259681614619565b600060208284031215613e87578081fd5b815161259681614619565b600060608284031215613ea3578081fd5b613ead6060614325565b613eb683613c17565b8152613ec460208401613a1f565b60208201526040830135613ed781614619565b60408201529392505050565b600060808284031215613ef4578081fd5b6125968383613bbd565b6000806000806000806000610100888a031215613f19578485fd5b87359650613f2a8960208a01613bac565b955060a08801356001600160401b0380821115613f45578687fd5b613f518b838c01613aad565b909750955060c08a0135915080821115613f69578283fd5b50613f768a828b01613aad565b989b979a5095989497959660e090950135949350505050565b60008060008060008060006101c0888a031215613faa578081fd5b87359650613fbb8960208a01613bac565b9550613fca8960a08a01613b5c565b9450613fda896101008a01613b5c565b935061016088013592506101808801359150613ff96101a08901613a1f565b905092959891949750929550565b6000806000806000610140868803121561401f578283fd5b853594506140308760208801613bac565b935061403f8760a08801613b5c565b949793965093946101008101359450610120013592915050565b6000806000806000806101608789031215614072578384fd5b863595506140838860208901613bac565b94506140928860a08901613b5c565b935061010087013592506101208701359150613e4e6101408801613a1f565b60008060008060008061010087890312156140ca578384fd5b863595506140db8860208901613bac565b945060a0870135935060c08701356001600160401b038111156140fc578283fd5b61410889828a01613aad565b9094509250613e4e905060e08801613a1f565b600080600080600080600080610120898b031215614137578182fd5b883597506141488a60208b01613bbd565b965060a08901356001600160401b0380821115614163578384fd5b61416f8c838d01613aad565b909850965060c08b0135915080821115614187578384fd5b506141948b828c01613aad565b90955093505060e089013591506141ae6101008a01613a1f565b90509295985092959890939650565b6000602082840312156141ce578081fd5b5051919050565b6000602082840312156141e6578081fd5b61259682613c17565b60008251614201818460208701614590565b9190910192915050565b6001600160a01b03948516815260208101939093526040830191909152909116606082015260800190565b6000602082528251806020840152614255816040850160208701614590565b601f01601f19169190910160400192915050565b6020808252601590820152744578636565647320776569676874206c696d69747360581b604082015260600190565b60006060820185835260206060818501528186518084526080860191508288019350845b818110156142e15784516001600160a01b0316835293830193918301916001016142bc565b505084810360408601528551808252908201925081860190845b81811015614317578251855293830193918301916001016142fb565b509298975050505050505050565b604051601f8201601f191681016001600160401b038111828210171561434d5761434d614603565b604052919050565b60006001600160401b0382111561436e5761436e614603565b5060209081020190565b60006001600160801b0380831681851680830382111561439a5761439a6145d7565b01949350505050565b600082198211156143b6576143b66145d7565b500190565b60006001600160801b03808416806143d5576143d56145ed565b92169190910492915050565b6000826143f0576143f06145ed565b500490565b80825b60018086116144075750614432565b818704821115614419576144196145d7565b8086161561442657918102915b9490941c9380026143f8565b94509492505050565b600061259660001960ff85168460008261445757506001612596565b8161446457506000612596565b816001811461447a5760028114614484576144b1565b6001915050612596565b60ff841115614495576144956145d7565b6001841b9150848211156144ab576144ab6145d7565b50612596565b5060208310610133831016604e8410600b84101617156144e4575081810a838111156144df576144df6145d7565b612596565b6144f184848460016143f5565b808604821115614503576145036145d7565b02949350505050565b60006001600160801b0380831681851681830481118215151615614503576145036145d7565b600081600019048311821515161561454c5761454c6145d7565b500290565b60006001600160801b0383811690831681811015614571576145716145d7565b039392505050565b60008282101561458b5761458b6145d7565b500390565b60005b838110156145ab578181015183820152602001614593565b838111156137f15750506000910152565b60006000198214156145d0576145d06145d7565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b801515811461462757600080fd5b5056fea2646970667358221220b95a19ca19a686a29d2d8344b8a699de029e0b6691ff22ef4090bd03a920092b64736f6c63430008020033";
    static readonly abi: {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): FeederLogicInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FeederLogic;
}