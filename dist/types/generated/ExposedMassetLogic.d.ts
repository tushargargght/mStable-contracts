/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface ExposedMassetLogicInterface extends ethers.utils.Interface {
  functions: {
    "computeMint(tuple[],uint8,uint256,tuple)": FunctionFragment;
    "computeMintMulti(tuple[],uint8[],uint256[],tuple)": FunctionFragment;
    "computeRedeem(tuple[],uint8,uint256,tuple,uint256)": FunctionFragment;
    "computeRedeemExact(tuple[],uint8[],uint256[],tuple,uint256)": FunctionFragment;
    "computeSwap(tuple[],uint8,uint8,uint256,uint256,tuple)": FunctionFragment;
    "getK(tuple[],tuple)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "computeMint",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      BigNumberish,
      BigNumberish,
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "computeMintMulti",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      BigNumberish[],
      BigNumberish[],
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "computeRedeem",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      BigNumberish,
      BigNumberish,
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "computeRedeemExact",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      BigNumberish[],
      BigNumberish[],
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "computeSwap",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getK",
    values: [
      { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      }
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "computeMint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "computeMintMulti",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "computeRedeem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "computeRedeemExact",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "computeSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getK", data: BytesLike): Result;

  events: {};
}

export class ExposedMassetLogic extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: ExposedMassetLogicInterface;

  functions: {
    computeMint(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _rawInput: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { mintAmount: BigNumber }>;

    computeMintMulti(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawInputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { mintAmount: BigNumber }>;

    computeRedeem(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _o: BigNumberish,
      _netMassetQuantity: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        rawOutputUnits: BigNumber;
        scaledFee: BigNumber;
      }
    >;

    computeRedeemExact(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawOutputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { grossMasset: BigNumber; fee: BigNumber }
    >;

    computeSwap(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _o: BigNumberish,
      _rawInput: BigNumberish,
      _feeRate: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        bAssetOutputQuantity: BigNumber;
        scaledSwapFee: BigNumber;
      }
    >;

    getK(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { k: BigNumber }>;
  };

  computeMint(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _i: BigNumberish,
    _rawInput: BigNumberish,
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  computeMintMulti(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _indices: BigNumberish[],
    _rawInputs: BigNumberish[],
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  computeRedeem(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _o: BigNumberish,
    _netMassetQuantity: BigNumberish,
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    _feeRate: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { rawOutputUnits: BigNumber; scaledFee: BigNumber }
  >;

  computeRedeemExact(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _indices: BigNumberish[],
    _rawOutputs: BigNumberish[],
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    _feeRate: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { grossMasset: BigNumber; fee: BigNumber }
  >;

  computeSwap(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _i: BigNumberish,
    _o: BigNumberish,
    _rawInput: BigNumberish,
    _feeRate: BigNumberish,
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      bAssetOutputQuantity: BigNumber;
      scaledSwapFee: BigNumber;
    }
  >;

  getK(
    _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
    _config: {
      supply: BigNumberish;
      a: BigNumberish;
      limits: { min: BigNumberish; max: BigNumberish };
      recolFee: BigNumberish;
    },
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    computeMint(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _rawInput: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeMintMulti(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawInputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeRedeem(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _o: BigNumberish,
      _netMassetQuantity: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        rawOutputUnits: BigNumber;
        scaledFee: BigNumber;
      }
    >;

    computeRedeemExact(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawOutputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { grossMasset: BigNumber; fee: BigNumber }
    >;

    computeSwap(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _o: BigNumberish,
      _rawInput: BigNumberish,
      _feeRate: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        bAssetOutputQuantity: BigNumber;
        scaledSwapFee: BigNumber;
      }
    >;

    getK(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    computeMint(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _rawInput: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeMintMulti(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawInputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeRedeem(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _o: BigNumberish,
      _netMassetQuantity: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeRedeemExact(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawOutputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    computeSwap(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _o: BigNumberish,
      _rawInput: BigNumberish,
      _feeRate: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getK(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    computeMint(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _rawInput: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeMintMulti(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawInputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeRedeem(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _o: BigNumberish,
      _netMassetQuantity: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeRedeemExact(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _indices: BigNumberish[],
      _rawOutputs: BigNumberish[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      _feeRate: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    computeSwap(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _i: BigNumberish,
      _o: BigNumberish,
      _rawInput: BigNumberish,
      _feeRate: BigNumberish,
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getK(
      _bAssets: { ratio: BigNumberish; vaultBalance: BigNumberish }[],
      _config: {
        supply: BigNumberish;
        a: BigNumberish;
        limits: { min: BigNumberish; max: BigNumberish };
        recolFee: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}