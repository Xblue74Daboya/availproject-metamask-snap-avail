import {Injected, InjectedAccounts, InjectedAccount} from "@polkadot/extension-inject/types";
import { Signer as InjectedSigner } from '@polkadot/api/types';
import {getAccountAddress, isPolkadotSnapInstalled, addKusamaAsset} from "./methods"

export interface NetworkConfig {
    explorerUrl: string;
    rpcUrl: string;
    unitName: string;
}

export class MetamaskPolkadotSnap implements Injected {

    public accounts: InjectedAccounts = {
        get: async () => {
            const account: InjectedAccount = {
               address: await getAccountAddress(),
               genesisHash: null,
               name: "Metamask account"
            }
            return [account];
            },
        subscribe: () => {
            const unsubCall = () => {};
            return unsubCall;
            }
    }
    public signer: InjectedSigner;
    
    //TODO
    constructor(network: string, config: NetworkConfig) {

    };

    public enableSnap = async (origin?: string): Promise<Injected> => {
        const defaultOrigin = new URL('package.json', 'http://localhost:8081').toString();
        const defaultPluginOrigin = `wallet_plugin_${defaultOrigin}`;

        if(isPolkadotSnapInstalled) {
            await window.ethereum.send({
                method: "wallet_enable",
                params: [{
                    [origin || defaultPluginOrigin]: {}
                }]
            });
            addKusamaAsset();
        }
        return this;
    }
}