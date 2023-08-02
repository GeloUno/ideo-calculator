import { useCallback, useState } from 'react';
import productsSubscription from '../data/products_subscription.json';
import productsHardware from '../data/products_hardawre.json';
import productsPackage from '../data/products_package.json';
import SelectYear from '../components/SelectYear';
import SelectOfferProduct from '../components/SelectOfferProduct';
import { OfferSelected } from '../interface/produnts_subscription';
import SelectHardware from '../components/SelectHardware';
import ConfirmOfferProduct from '../components/ConfirmOfferProduct';

export enum StepPage {
  SELECT_YEAR = 0,
  SELECT_OFFER = 1,
  SELECT_HARDWARE = 2,
  CONFIRM_OFFER = 3,
}

function StepperSelectProductPage() {
  const [stepPage, setStepPage] = useState<StepPage>(StepPage.SELECT_YEAR);
  const [year, setYear] = useState<number>(
    productsSubscription[0].details[0].year
  );
  const [offerSelected, setOfferSelected] = useState<Array<OfferSelected>>([]);
  const [hardwareSelected, setHardwareSelected] = useState(false);

  function handlerSelectYear(yearSelected: number) {
    setYear(() => yearSelected);
    setStepPage(() => StepPage.SELECT_OFFER);
  }

  function handlerOfferSelectedReset() {
    setOfferSelected([]);
  }
  function handlerHardwareSelectedReset() {
    setHardwareSelected(false);
  }

  const handleSelectOffer = useCallback(
    (newOfferSelected: OfferSelected) => {
      if (newOfferSelected.selected) {
        setOfferSelected([...offerSelected, newOfferSelected]);
      } else {
        const removeOferTemp = offerSelected.filter(
          (offer) => offer.product !== newOfferSelected.product
        );
        setOfferSelected(removeOferTemp);
      }
    },
    [offerSelected]
  );

  if (stepPage === StepPage.SELECT_YEAR) {
    return (
      <SelectYear
        details={productsSubscription[0].details}
        handlerSelectYear={handlerSelectYear}
      />
    );
  } else if (stepPage === StepPage.SELECT_OFFER) {
    return (
      <SelectOfferProduct
        year={year}
        handleSelectOffer={handleSelectOffer}
        setStepPage={setStepPage}
        offerSelected={offerSelected}
        handlerOfferSelectedReset={handlerOfferSelectedReset}
      />
    );
  } else if (stepPage === StepPage.SELECT_HARDWARE) {
    return (
      <SelectHardware
        hardwareSelected={hardwareSelected}
        setHardwareSelected={setHardwareSelected}
        setStepPage={setStepPage}
        productsHardware={productsHardware}
        handlerOfferSelectedReset={handlerHardwareSelectedReset}
      />
    );
  } else if (stepPage === StepPage.CONFIRM_OFFER) {
    return (
      <ConfirmOfferProduct
        setStepPage={setStepPage}
        offerSelected={offerSelected}
        hardwareSelected={hardwareSelected}
        productsPackage={productsPackage}
        productsHardware={productsHardware}
        productsSubscription={productsSubscription}
        year={year}
      />
    );
  } else {
    return <div>no offer slected</div>;
  }
}

export default StepperSelectProductPage;
