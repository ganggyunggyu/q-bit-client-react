import {
  BottomBar,
  CaleanderAppBar,
  ColorVariants,
  SearchAppBar,
  TextVariants,
  TitleBackAppBar,
} from '@/widgets';
import { TitleAppBar, TitleBellAppBar } from '@/widgets';
import {
  BottomSheet,
  Button,
  CheckBoxInput,
  CheckToggle,
  Chip,
  cn,
  Dropdown,
  Modal,
  SelectBox,
  Tabs,
} from '@/shared';
import React from 'react';
import { Cert, RemainingDateCard } from '@/entities';
import { certMock } from '@/entities/cert/mock/cert.mock';
import { CertCard } from '@/features';

export const AdminComponents = () => {
  const tabs = [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
    { id: 'c', label: 'C' },
  ];

  const [searchPageSelectedTab, setSearchPageSelectedTab] = React.useState('a');
  const [isPageInit, setIsPageInit] = React.useState(false);
  const handleTabClick = (tab: 'map' | 'list') => {
    if (!isPageInit) setIsPageInit(true);
    setSearchPageSelectedTab(tab);
  };

  const [isBottomSheet, setIsBottomSheet] = React.useState(false);
  const [isModal, setIsModal] = React.useState(false);
  return (
    <main className="p-3 space-y-16 bg-[var(--bg-alternative)] min-h-screen pb-20">
      <TextVariants />
      <ColorVariants />

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">App Bar</h1>

        <TitleAppBar title={'Title'} />
        <TitleBellAppBar title={'Title'} />
        <TitleBackAppBar title={'Title'} />

        <CaleanderAppBar year="2012" month="05" />

        <SearchAppBar inputProps={{ placeholder: 'Search' }} />
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">Button M</h1>
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="normal">Normal</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="disabled">Disabled</Button>
        <Button variant="kakao">Kakao</Button>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">Button S</h1>
        <Button size="sm" variant="primary">
          Primary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="normal">
          Normal
        </Button>
        <Button size="sm" variant="warning">
          Warning
        </Button>
        <Button size="sm" variant="disabled">
          Disabled
        </Button>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">Chip</h1>
        <Chip variant="default">Chip</Chip>
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">SelectBox</h1>
        <SelectBox children={'Default'} />
        <SelectBox children={'Selected'} variant="selected" />
        <SelectBox children={'Disabled'} variant="disabled" />
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="text-display-2">SelectBox Two Line</h1>
        <article className="grid grid-cols-2 gap-4 w-8/12">
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="selected"
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="selected"
          />
          <SelectBox
            children={
              <div className="flex flex-col gap-3">
                <p>Default</p>
                <p>TwoLine</p>
              </div>
            }
            variant="disabled"
          />
        </article>
      </section>

      <section className="flex flex-col gap-3 bg-divide py-2">
        <h1 className="font-display-1">Check Box</h1>

        <CheckBoxInput
          label="할일을 입력하세요"
          checked={false}
          onChange={(val) => console.log('체크 상태:', val)}
        />
      </section>

      <section>
        <h1 className="font-display-1">Dropdown</h1>

        <Dropdown
          options={['옵션1', '욥션2', '옵션3']}
          defaultLabel="미선택"
          onChange={(val) => console.log('Selected:', val)}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="font-display-1">My Qualification</h1>

        <RemainingDateCard day={30} />
        <RemainingDateCard day={20} />
        <RemainingDateCard day={10} />
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="font-display-1">Check Toggle</h1>

        <CheckToggle
          defaultChecked={true}
          onChange={(val) => console.log('체크:', val)}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h1 className="font-display-1">BottonSheet, Modal</h1>
        <Button onClick={() => setIsBottomSheet(true)}>바텀시트 오픈</Button>
        <Button onClick={() => setIsModal(true)}>모달 오픈</Button>

        <BottomSheet
          isBottomSheet={isBottomSheet}
          setIsBottomSheet={setIsBottomSheet}
        >
          <div className="h-[200px]">
            <RemainingDateCard day={30} />
            <RemainingDateCard day={20} />
            <RemainingDateCard day={10} />
          </div>
        </BottomSheet>
        <Modal isOpen={isModal} setIsOpen={setIsModal}>
          <RemainingDateCard day={30} />
          <RemainingDateCard day={20} />
          <RemainingDateCard day={10} />
        </Modal>
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="font-display-1">Cert Card</h1>
        {certMock.map((cert, index) => {
          return (
            <CertCard
              key={cert.jmfldnm}
              cert={cert}
              dDay={7}
              isLiked={index % 2 === 1}
            />
          );
        })}
      </section>

      <section className="flex flex-col gap-3">
        <h1 className="font-display-1">Tab Bar</h1>

        <Tabs
          tabs={tabs}
          selected={searchPageSelectedTab}
          onSelect={handleTabClick}
          tabKey="search"
        />
      </section>
    </main>
  );
};
