import { NextPageContext } from 'next';
import axios from 'axios';
import PreferenceCard, { ProjectCategory } from '@frontend/components/preferenceCard';

interface UserPreferencesProps {

}

const UserPreferences = function UserPreferencesComponent<UserPreferencesProps>({}) {
  return (
    <>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_1}/>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_2}/>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_3}/>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_4}/>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_5}/>
    <PreferenceCard imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" projectCategory={ProjectCategory.CATEGORY_6}/>
    </>
  );
}

UserPreferences.getInitialProps = async ({ req }: NextPageContext) => {
 return {}; 
};

export default UserPreferences;