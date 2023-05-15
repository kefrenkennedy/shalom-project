import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from 'react-icons/ri';

import { Stack } from '@chakra-ui/react';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SideBarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/participante/inscricoes">
          Inscrições
        </NavLink>
      </NavSection>

      {/* <NavSection title="CONFIGURAÇÕES">
        <NavLink icon={RiInputMethodLine} href="participante/perfil">
          Perfil
        </NavLink>
      </NavSection> */}
    </Stack>
  );
}
