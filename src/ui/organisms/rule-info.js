import * as React from 'react';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';

import { Heading, Button, Switcher } from 'ui/atoms';
import { RuleExample } from 'ui/molecules';
import { Check, Wrench } from 'ui/outlines';
import { color } from 'ui/theme';


const Name = styled(Heading)`
  display: inline;
  font-size: 25px;
  color: ${color.primary};
  margin-bottom: 0;
`;

const ShortDescription = styled.p`
  display: inline;
  font-size: 25px;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: 5px;
`;

const Title = styled.div`
  padding-right: 20px;

  svg {
    position: relative;
    z-index: 9;
    display: inline;
    margin-top: 2.5px;
    margin-left: 10px;
  }
`;

const StyledSwitcher = styled(Switcher)`
  flex-shrink: 0;
  margin-top: 5px;
`;

const Paragraph = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

const StyledButton = styled(Button)`
  margin-right: 15px;
  
  &:last-child {
    margin-right: 0;
  }
`;

const StyledRuleExample = styled(RuleExample)`
  flex-grow: 1;
  max-width: 50%;
`;

const RuleExamples = styled.div`
  flex-grow: 1;
  display: flex;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${props => css`

    ${props.isAllowedToGrow && css`
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    `}
  `}
`;

const Footer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const Wrapper = styled.div`
  flex: 0 1 80%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  overflow-x: hidden;
  overflow-y: auto;
`;


export class RuleInfo extends React.PureComponent {

  render = () => {
    return (
      <Wrapper className={ this.props.rule.className }>
        <Section>
          <HeaderSection>
            <Title>
              <Name>{ this.props.rule.name }</Name>
              <ShortDescription>- { this.props.rule.shortDescription }</ShortDescription>
              {
                this.props.rule.isRecommended &&
                <React.Fragment>
                  <Check data-tip data-for={ `rule-info-check-icon-${ this.props.rule.name }` } width={ 20 } height={ 20 } fill={ color.secondary }/>
                  <ReactTooltip id={ `rule-info-check-icon-${this.props.rule.name}` } className={ 'react-tooltip' } effect={ 'solid' } delayShow={ 500 }>
                    <span>Recommended</span>
                  </ReactTooltip>
                </React.Fragment>
              }
              {
                this.props.rule.isFixable &&
                <React.Fragment>
                  <Wrench data-tip data-for={ `rule-info-wrench-icon-${ this.props.rule.name }` } width={ 20 } height={ 20 } fill={ color.secondary }/>
                  <ReactTooltip id={ `rule-info-wrench-icon-${this.props.rule.name}` } className={ 'react-tooltip' } effect={ 'solid' } delayShow={ 500 }>
                    <span>Fixable</span>
                  </ReactTooltip>
                </React.Fragment>
              }
            </Title>

            <StyledSwitcher
              data-tip
              data-for={ `rule-info-switcher-${this.props.rule.name}` }
              size={ 'large' }
              isActive={ this.props.rule.isTurnedOn }
              onClick={ () => this.props.onSwitcherClick(this.props.rule.name, !this.props.rule.isTurnedOn) }
            />
            <ReactTooltip id={ `rule-info-switcher-${this.props.rule.name}` } className={ 'react-tooltip' } effect={ 'solid' } delayShow={ 750 }>
              <span>{ this.props.rule.isTurnedOn ? 'Turn off' : 'Turn on' }</span>
            </ReactTooltip>
          </HeaderSection>

          <Paragraph>{ this.props.rule.longDescription }</Paragraph>
        </Section>

        <Section>
          <Heading>What ESLint should do when it catches the rule break</Heading>
          <Select
            classNamePrefix={ 'react-select' }
            value={
              this.props.rule.value === 'warn' ?
                { label: 'Show a warning', value: 'warn' }
                :
                { label: 'Throw an error', value: 'error' }
            }
            options={ [
              { label: 'Show a warning', value: 'warn' },
              { label: 'Throw an error', value: 'error' },
            ] }
            onChange={ ({ value }) => this.props.onSelectChange(this.props.rule.name, value) }
          />
        </Section>

        <Section isAllowedToGrow={ true }>
          <Heading>Rule examples</Heading>
          <RuleExamples>
            <StyledRuleExample code={ this.props.rule.examples && this.props.rule.examples.correct } theme={ 'correct' }/>
            <StyledRuleExample code={ this.props.rule.examples && this.props.rule.examples.incorrect } theme={ 'incorrect' }/>
          </RuleExamples>
        </Section>

        <Footer>
          <div>
            <StyledButton>Reset rule settings</StyledButton>
          </div>

          <div>
            <StyledButton onClick={ () => this.props.onPreviousOrNextButtonClick('previous') }>Previous rule</StyledButton>
            <StyledButton onClick={ () => this.props.onPreviousOrNextButtonClick('next') }>Next rule</StyledButton>
          </div>
        </Footer>
      </Wrapper>
    );
  };
};
