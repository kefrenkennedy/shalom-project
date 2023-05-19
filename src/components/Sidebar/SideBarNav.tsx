import { useMemo } from 'react';
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

const adminTabs = [
  {
    icon: RiDashboardLine,
    href: '/admin/eventos',
    title: 'Eventos',
  },
  {
    icon: RiDashboardLine,
    href: '/admin/inscricoes',
    title: 'Inscrições',
  },
];

const participantTabs = [
  {
    icon: RiDashboardLine,
    href: '/participante/inscricoes',
    title: 'Inscrições',
  },
];

export function SideBarNav() {
  const { user } = useAuth();

  const tabs = useMemo(
    () => (user.role === 'ADMINISTRATOR' ? adminTabs : participantTabs),
    [user],
  );

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        {tabs.map((tab) => (
          <NavLink key={tab.href} icon={tab.icon} href={tab.href}>
            {tab.title}
          </NavLink>
        ))}
      </NavSection>

      {/* <NavSection title="CONFIGURAÇÕES">
        <NavLink icon={RiInputMethodLine} href="participante/perfil">
          Perfil
        </NavLink>
      </NavSection> */}
    </Stack>
  );
}
