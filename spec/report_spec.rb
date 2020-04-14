require 'report'

describe 'report' do
  describe 'green' do
    it 'returns one green' do
      expect(report('Green')).to eq('Green: 1')
    end

    it 'returns two greens' do
      expect(report('Green, Green')).to eq('Green: 2')
    end

    it 'returns three greens' do
      expect(report('Green, Green, Green')).to eq('Green: 3')
    end
  end

  describe 'Amber' do
    it 'returns one Amber' do
      expect(report('Amber')).to eq('Amber: 1')
    end

    it 'returns two Amber' do
      expect(report('Amber, Amber')).to eq('Amber: 2')
    end

    it 'returns three Amber' do
      expect(report('Amber, Amber, Amber')).to eq('Amber: 3')
    end
  end

  describe 'Red' do
    it 'returns one Red' do
      expect(report('Red')).to eq('Red: 1')
    end

    it 'returns two Red' do
      expect(report('Red, Red')).to eq('Red: 2')
    end

    it 'returns three Red' do
      expect(report('Red, Red, Red')).to eq('Red: 3')
    end
  end

  describe 'Combinations' do
    it 'returns one green, one red' do
      expect(report('Red, Green')).to eq("Green: 1\nRed: 1")
    end

    it 'returns two green, one red' do
      expect(report('Green, Red, Green')).to eq("Green: 2\nRed: 1")
    end

    it 'returns all three' do
      expect(report('Red, Red, Amber, Green, Green')).to eq("Green: 2\nAmber: 1\nRed: 2")
    end
  end

  describe 'non-grades' do
    it 'allows for one non-grade' do
      expect(report('wrong')).to eq("Other: 1")
    end

    it 'allows for two non-grade' do
      expect(report('wrong, blah, error')).to eq("Other: 3")
    end
  end
end